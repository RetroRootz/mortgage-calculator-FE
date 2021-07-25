import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CalculatorService from '../services/CalculatorService';
import Paper from '@material-ui/core/Paper';
import Typist from 'react-text-typist';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "550px",
        height: "500px",
        marginLeft: "100px",
        marginTop: "40px",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    input: {
        margin: theme.spacing(3),
        marginLeft: "30px",
        width: '200px',
        borderColor: '#ffffff'
    },
    inputText: {
        color: "#ffffff",
    },
    notchedOutline: {
        borderColor: '#ffffff'
    },
    formHeader: {
        fontSize: '30px',
        fontWeight: 500,
        color: '#FFFFFF',
        padding: theme.spacing(1, 0, 0, 5),
    },
    regGrid: {
        padding: theme.spacing(2)
    },
    regButton: {
        fontFamily: "Oswald",
        color: '#ffffff',
        marginLeft: '400px',
        borderColor: '#ffffff',
        width: '100px',
        height: '50px'
    },
    msg: {
        color: '#ffffff',
        fontFamily: "Oswald"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Calculator = () => {

    const classes = useStyles();

    const [register, setRegister] = useState({
        firstName: "",
        surname: "",
        email: "",
        createPassword: "",
        password: "",
        message: ""
    });
    const [confirmMsg, setConfirmMsg] = useState("");
    const [msg, setMsg] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        let value = e.target.value;
        setRegister({
            ...register,
            [e.target.name]: value
        })
    };

    const customerRegistration = async () => {
        try {
            if (register.email !== "") {
                await CalculatorService.registerData(register).then((result) => {
                    console.log('result', result.data);
                });
                setPopUp(true);
                handleOpen();
                setRegister({
                    firstName: "",
                    surname: "",
                    email: "",
                    createPassword: "",
                    password: "",
                    message: ""
                });
            }
        }
        catch (e) {
            console.log('error', e.response);
        }
    };

    return (
        <React.Fragment>
            <div>
                <Paper className={classes.paper} elevation={10}>
                    <Typist className={classes.formHeader} typingSpeed={130} pauseTime={5000} sentences={['Find your home. We will get you there.']} loop={true} />
                    <div className={classes.regGrid}>
                        <TextField
                            className={classes.input}
                            name="firstName"
                            placeholder="First Name"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            InputProps={{
                                className: classes.inputText,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={register.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.input}
                            name="surname"
                            placeholder="Surname"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            InputProps={{
                                className: classes.inputText,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={register.surname}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.input}
                            name="email"
                            placeholder="Email"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            InputProps={{
                                className: classes.inputText,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            style={{ width: '454px' }}
                            value={register.email}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.input}
                            name="createPassword"
                            placeholder="Create Password"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            type="password"
                            InputProps={{
                                className: classes.inputText,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={register.createPassword}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.input}
                            name="password"
                            placeholder="Confirm Password"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            type="password"
                            InputProps={{
                                className: classes.inputText,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={register.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button className={classes.regButton} variant="outlined" onClick={() => customerRegistration()}>Register</Button>
                </Paper>
            </div>
            {popUp === true ?
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.modalPaper}>
                                <h2>Successfully Registered!</h2>
                                <p>Thank you for registering. You are one step away from your new home.
                                    One of our agents will be in touch with you soon!</p>
                            </div>
                        </Fade>
                    </Modal>
                </div> : null}
        </React.Fragment>
    );
};

export default Calculator;