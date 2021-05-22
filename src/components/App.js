import React, { useState } from 'react';
import DisplayImage from './DisplayImage';
import UploadButton from './UploadButton';
import Results from './Results'

function App() {
    // Loading stage to upload photos
    const [ loading, setLoading ] = useState(false);
    const [ preSignedUrl, setPreSignedUrl ] = useState();
    const [ prediction, setPrediction ] = useState();
    const [ waitingForPrediction, setWaitingForPrediction ] = useState(false)

  return (
    <div>
      <UploadButton 
        setLoading={setLoading}
        setPreSignedUrl={setPreSignedUrl}
        preSignedUrl={preSignedUrl}
        setPrediction={setPrediction}
        setWaitingForPrediction={setWaitingForPrediction}
      />
      {loading || waitingForPrediction && <Results 
        waitingForPrediction={waitingForPrediction}
        prediction={prediction}
      />}
      {loading || waitingForPrediction && <DisplayImage 
        preSignedUrl={preSignedUrl}
      />}
    </div>
  );
}

export default App;
