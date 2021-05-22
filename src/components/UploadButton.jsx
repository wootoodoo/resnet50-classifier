import React, { useState, useEffect } from "react";
import axios from 'axios';
import Config from '../config/config';

function UploadButton(props) {
  const [ selectedFile, setSelectedFile ] = useState();

  async function changeHandler(event) {
    try {
      setSelectedFile(event.target.files);
      let fileName = event.target.files[0].name
      // Get pre-signed URL from S3 through API gateway
      const body = {
        "objectKey": fileName
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let s3Url = await axios.post(Config.s3PostUrl, body, config);
      let s3PreSignedUrl = s3Url.data;
      props.setPreSignedUrl(s3PreSignedUrl);
    } catch (err) {
      console.log(err);
    }  
  }

  async function submitImage() {
    // Upload into S3 bucket
    axios.put(
      props.preSignedUrl.putUrl, selectedFile[0],
      {
        headers: 
          {
            'accept': 'application/json',
            'Content-Type': selectedFile[0].type
          }
      }
    ).then(response => {
      props.setLoading(true);
    })


    // Connect to websocket
    let webSocket = new WebSocket(Config.webSocket);
    // Send file name
    let message = {
      action: "registerFileName",
      message: selectedFile[0].name
    }
    webSocket.onopen = function(e) {
      console.log("[open] Connection established");
      webSocket.send(JSON.stringify(message));
    };
    
    // receive message from server when done
    webSocket.onmessage = function (event) {
      let res = JSON.parse(event.data);
      console.log(res);
      props.setPrediction(res);
      props.setWaitingForPrediction(true);
      props.setLoading(false);
      webSocket.close(1000, "Work complete");
    }
  }

  useEffect(() => {
    console.log("received preSignedUrl from S3");
    console.log(selectedFile);
  }, [selectedFile]);

  return (
    <div>
      <input type="file" name="file upload" onChange={changeHandler} />
      <button className="btn btn-dark" onClick={submitImage}>
        Let's infer!
    </button>
    </div>
    
  )
}

export default UploadButton;