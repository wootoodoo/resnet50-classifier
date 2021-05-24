import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';


export default (props) => {

  const mobileDevice = useMediaQuery('(max-width:767px)');

  return (
    
    <Grid
      container
      alignItems="center"
      justify="center"
      className="results"
    >
      
        {!props.waitingForPrediction && <Typography
          className={"MuiTypography--heading"}
          variant={mobileDevice ? "body1" : "h5"}
          align={"center"}
          gutterBottom
      >Waiting for the results from the cloud! Sorry for the wait! Sometimes I take up to 30 seconds from a cold start.</Typography>}
        
        {props.waitingForPrediction && (
          <Typography
          className={"MuiTypography--heading"}
          variant={mobileDevice ? "body1" : "h5"}
          align={"left"}
          gutterBottom>
            <p>I thought it was a {props.prediction.prediction_1} with a confidence of {Math.round(props.prediction.predictionConfidence_1)}%.</p>
            <p>My 2nd guess would be a {props.prediction.prediction_2} with a confidence of {Math.round(props.prediction.predictionConfidence_2)}%.</p>
            <p>My 3rd guess would be a {props.prediction.prediction_3} with a confidence of {Math.round(props.prediction.predictionConfidence_3)}%.</p>
            <p>My 4th guess would be a {props.prediction.prediction_4} with a confidence of {Math.round(props.prediction.predictionConfidence_4)}%.</p>
            <p>My 5th guess would be a {props.prediction.prediction_5} with a confidence of {Math.round(props.prediction.predictionConfidence_5)}%.</p>
            <h3>How did I do?</h3>
          </Typography>
        )}
    </Grid>

  );
}