import React from 'react';


export default (props) => {

  return (
    <div>
      {!props.waitingForPrediction && <h1>Waiting for the results from the cloud!!</h1>}
    
      {props.waitingForPrediction && (
        <div>
          <h2>My 1st choice was a {props.prediction.prediction_1} with a confidence of {Math.round(props.prediction.predictionConfidence_1)}%</h2>
          <h2>My 2nd choice was a {props.prediction.prediction_2} with a confidence of {Math.round(props.prediction.predictionConfidence_2)}%</h2>
          <h2>My 3rd choice was a {props.prediction.prediction_3} with a confidence of {Math.round(props.prediction.predictionConfidence_3)}%</h2>
          <h2>My 4th choice was a {props.prediction.prediction_4} with a confidence of {Math.round(props.prediction.predictionConfidence_4)}%</h2>
          <h2>My 5th choice was a {props.prediction.prediction_5} with a confidence of {Math.round(props.prediction.predictionConfidence_5)}%</h2>
          <h1>How did I do?</h1>
        </div>
      )}
    </div>
  );
}