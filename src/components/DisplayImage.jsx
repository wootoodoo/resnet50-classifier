import React from 'react';
import Config from '../config/config.js'


export default (props) => {
  // Get the preSigned URL from S3

  return (
    <div>
      <img class="img" src={props.preSignedUrl.getUrl}></img>
    </div>
  );
}

  
  