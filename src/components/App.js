import React, { useState, useEffect } from 'react';
import DisplayImage from './DisplayImage';
import UploadButton from './UploadButton';
import Results from './Results';
import Header from './Header';
import Footer from './Footer';

function App() {
  // Loading stage to upload photos
  const [ sentToS3, setSentToS3 ] = useState(false)
  const [ loading, setLoading ] = useState(false);
  const [ preSignedUrl, setPreSignedUrl ] = useState();
  const [ prediction, setPrediction ] = useState();
  const [ waitingForPrediction, setWaitingForPrediction ] = useState(false)

  useEffect(() => {
    console.log("reload the image");
  }, [sentToS3]);

  return (
    <div>
      <Header />
      <UploadButton 
        setLoading={setLoading}
        setPreSignedUrl={setPreSignedUrl}
        preSignedUrl={preSignedUrl}
        setPrediction={setPrediction}
        setWaitingForPrediction={setWaitingForPrediction}
        setSentToS3={setSentToS3}
      />
      {(loading || waitingForPrediction) && <Results 
        waitingForPrediction={waitingForPrediction}
        prediction={prediction}
      />}
      {(loading || waitingForPrediction) && <DisplayImage 
        preSignedUrl={preSignedUrl}
      />}
      <Footer />
    </div>
  );
}

export default App;
