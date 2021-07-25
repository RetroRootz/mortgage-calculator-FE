import { axiosInstance } from '../api/MortageCalculator';

const CalculatorService = {

	async mortgageCalculatorData(values) {	
		return axiosInstance.post(
			'calculator/calculatemortgage',
			values
		);
	},

	async registerData(details) {	
		return axiosInstance.post(
			'calculator/register',
			details
		);
	}
};

export default CalculatorService;