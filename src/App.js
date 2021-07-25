import React from 'react';
import backgroundImage from "./images/minimalistHome.jpg" 
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './components/Calculator';

const useStyles = makeStyles((theme) => ({
root:{
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw'
}
}));

const App = () => {
  
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Calculator/>
      </Grid>
  );
};

export default App;