import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CalculatorService from '../services/CalculatorService';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
    calcGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(0, 10, 0, 10),
        maxWidth: '600px',
        margin: 'auto'
    },
    heading: {
        fontSize: '40px',
        fontWeight: 500,
        color: '#2a6279',
        padding: theme.spacing(5, 3, 0, 12),
        textTransform: 'uppercase'
    },
    button: {
        color: '#ffffff',
        fontFamily: "Oswald",
        backgroundColor: '#2a6279',
        marginLeft: '92px'
    },
    results: {
        fontSize: '20px',
        fontWeight: 500,
        color: '#ffffff',
        padding: theme.spacing(1, 0, 0, 5),
        textTransform: 'uppercase'
    },
    resultsText: {
        fontFamily: "Oswald",
        fontSize: '60px',
        padding: theme.spacing(1, 0, 0, 30),
        color: '#ffffff'
    },
    payments:{
      width: "550px",
      height: "150px", 
      marginLeft: "100px",      
      marginTop: "40px",
      backgroundColor: 'rgba(0,0,0,0.6)'
  },
}));
 

const Calculator = () => {
    const classes = useStyles();

    const [calcValues, setCalcValues] = useState({
        purchasePrice: "",
        deposit: "",
        loanTerm: "",
        interestRate: ""
    });
    const [bondRepayments, setBondRepayments] = useState(0);
    const years = [ 5, 10, 15, 20, 25, 30 ];

    const handleChange = (e) => {    
        let value = e.target.value;   
        setCalcValues({
            ...calcValues,
            [e.target.name]: value
        })
    };

    async function calculateMortgage() {    
        const values = {
            purchasePrice: parseFloat(calcValues.purchasePrice),
            deposit: parseFloat(calcValues.deposit),
            loanTerm: parseInt(calcValues.loanTerm),
            interestRate: parseFloat(calcValues.interestRate)
        }
        const response = await CalculatorService.mortgageCalculatorData(values).then(data => {
            setBondRepayments(parseFloat(data.data).toFixed(2));
        });
    };

    return (
        <React.Fragment>
            <div>
                <h1 className={classes.heading}>Mortgage Calculator</h1>
                <Grid container spacing={3} className={classes.calcGrid}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Purchase price"
                            name="purchasePrice"
                            placeholder="0.00"
                            variant="outlined"
                            value={calcValues.purchasePrice}
                            onChange={handleChange}
                            className={classes.textFields}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R</InputAdornment>,             
                              }}                    
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Deposit (Optional)"
                            name="deposit"
                            placeholder="0.00"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R</InputAdornment>
                              }}
                            variant="outlined"
                            value={calcValues.deposit}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Loan Term"
                            select
                            name="loanTerm"
                            placeholder="0"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={calcValues.loanTerm}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                           fullWidth
                        >
                            {years.map((term) => (
                                <option>
                                    {term}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Interest Rate"
                            name="interestRate"
                            placeholder="7.00%"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={calcValues.interestRate}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" className={classes.button} onClick={() => calculateMortgage()}>
                    Calculate
                </Button>
            </div>
            <div>
              <Paper className={classes.payments} elevation={10}>
                <h1 className={classes.results}>Monthly Payments</h1>
                <Typography className={classes.resultsText}>R {bondRepayments}</Typography>
              </Paper> 
              <Register />
           </div>  
        </React.Fragment>
    );
};

export default Calculator;