import Oidc from 'oidc-client';

let _idToken = null;
let _accessToken = null;
let _expiresAt = null;
let _scopes = null;

class Auth {
	constructor(router) {
		this.userProfile = null;
		this.router = router;
		this.auth = new Oidc.UserManager({
			authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
			client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
			redirect_uri: `${process.env.REACT_APP_SILENT_REDIRECT_URL}/callback`, //The URI of your client application to receive a response from the OIDC provider.
			silent_redirect_uri: `${process.env.REACT_APP_SILENT_REDIRECT_URL}/callback`, //(string): The URL for the page containing the code handling the silent renew.
			post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
			post_logout_uri: process.env.REACT_APP_LOGOFF_URL,
			scope: 'openid profile offline_access', //(string, default: 'openid'): The scope being requested from the OIDC provider.
			response_type: 'id_token token',
		});
	}

	login = () => {
		return this.auth
			.signinRedirect()
			.then((result) => {
				return true; //login successful
			})
			.catch((error) => {
				this.router.push('/error');
				return false;
			});
	};

	handleAuthentication = () => {
		this.auth
			.signinRedirectCallback()
			.then((authResult) => {
				if (authResult && authResult.access_token && authResult.id_token) {
					//Success starting session
					this.setSession(authResult);
					this.userProfile = this.auth.getUser();
				    this.router.push('/dashboard');
					return authResult;
				} else {
					//Error handling authentications
					this.router.push('/error');
				}
			})
			.catch((error) => {
				console.log('AUTH', error);
			});
	};

	setSession = (authResult) => {
		_expiresAt = authResult.expires_in * 1000 + new Date().getTime();
		_idToken = authResult.id_token;
		_accessToken = `Bearer ${authResult.id_token}`;
		_scopes = authResult.scopes || this.requestedScopes || '';
		sessionStorage.setItem('lew-portal', `Bearer ${authResult.id_token}`);
		this.scheduleRenewal();
	};

	isAuthenticated = () => {
		return new Date().getTime() < _expiresAt;
	};

	logout = () => {
		this.userProfile = null;
		this.auth
			.signoutRedirectCallback()
			.then(() => {
				sessionStorage.clear();
				//Signed out
				document.location.href = process.env.REACT_APP_LOGOFF_REDIRECT_URL;
			})
			.catch((error) => {
				console.log('AUTH', error);
			});
	};

	getAccessToken = () => {
		if (!_accessToken) {
			return null;
		}
		return _accessToken;
	};

	getProfile = (callback) => {
		if (this.userProfile) return callback(this.userProfile);
		if (this.getAccessToken() != null) {
			this.auth
				.getUser()
				.then((result) => {
					if (result) {
						return result;
					} else {
						callback(null);
					}
				})
				.catch((error) => {
					console.log('AUTH', error);
				});
		}
	};

	renewToken(callback) {
		this.auth
			.getUser()
			.then((result) => {
				if (result) {
					this.setSession(result);
				}
				if (callback) {
					callback(null, null);
				}
			})
			.catch((error) => {
				if (error) {
					console.log('AUTH', 'Error validating token', error);
				}
			});
	}

	scheduleRenewal = () => {
		const delay = _expiresAt - Date.now();
		if (delay > 0) {
			setTimeout(() => {
				this.renewToken();
			}, delay);
		}
	};
}

export { Auth, _accessToken, _scopes, _idToken };
