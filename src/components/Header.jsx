import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

function Header () {
  const mobileDevice = useMediaQuery('(max-width:767px)');
  return (
    <Grid 
      container
      item xs={12}
      justify="center"
      alignItems="center"
    >
    <Typography
      className={"MuiTypography--heading header-font"}
      variant={mobileDevice ? "h5" : "h2"}
      align={"center"}
      gutterBottom={true}
    >
      Jon's serverless resnet-50 image classifier!
    </Typography>
    </Grid>
  )
}

export default Header;