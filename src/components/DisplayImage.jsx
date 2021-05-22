import React from 'react';
import { Grid } from '@material-ui/core';

export default (props) => {
  // Get the preSigned URL from S3

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <img className="project-image" src={props.preSignedUrl.getUrl}></img>
    </Grid>
  );
}

  
  