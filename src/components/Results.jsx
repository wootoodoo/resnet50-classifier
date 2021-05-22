import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';


export default (props) => {
  function alert1() {
    return <h1>Sorry for the wait! Sometimes I take up to 30 seconds from a cold start.</h1>;
  }
  
  const mobileDevice = useMediaQuery('(max-width:767px)');
  return (
    
    <Grid
      container
      alignItems="center"
      justify="center"
    >
      
        {!props.waitingForPrediction && <Typography
          className={"MuiTypography--heading"}
          variant={mobileDevice ? "h4" : "h3"}
          align={"center"}
          gutterBottom
      >Waiting for the results from the cloud! Sorry for the wait! Sometimes I take up to 30 seconds from a cold start.</Typography>}
        
        {props.waitingForPrediction && (
          <Typography
          className={"MuiTypography--heading"}
          variant={mobileDevice ? "h4" : "h3"}
          align={"left"}
          gutterBottom>
            <h2>I thought it was a {props.prediction.prediction_1} with a confidence of {Math.round(props.prediction.predictionConfidence_1)}%.</h2>
            <h2>My 2nd guess would be a {props.prediction.prediction_2} with a confidence of {Math.round(props.prediction.predictionConfidence_2)}%.</h2>
            <h2>My 3rd guess would be a {props.prediction.prediction_3} with a confidence of {Math.round(props.prediction.predictionConfidence_3)}%.</h2>
            <h2>My 4th guess would be a {props.prediction.prediction_4} with a confidence of {Math.round(props.prediction.predictionConfidence_4)}%.</h2>
            <h2>My 5th guess would be a {props.prediction.prediction_5} with a confidence of {Math.round(props.prediction.predictionConfidence_5)}%.</h2>
            <h1>How did I do?</h1>
          </Typography>
        )}
    </Grid>

  );
}