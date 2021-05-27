import React from "react";
import LinkedIn from "../images/linkedin.png";
import Facebook from "../images/facebook.png";
import Github from "../images/github.png"
import { Grid, useMediaQuery, Button } from '@material-ui/core';

function Footer() {
  return (
    <footer className="footer">
      <Grid 
        container 
        item xs={12}
        alignContent='center'
        justify='center'
      >
            <a href="https://www.linkedin.com/in/jonathan-lee-684245128/"><img src={LinkedIn}></img></a>     
            <a href="https://www.facebook.com/jonathan.leecy"><img src={Facebook}></img></a>
            <a  href="https://github.com/wootoodoo/"><img src={Github}></img></a>  
        </Grid>
          <Grid
          container 
          item xs={12}
          alignContent='center'
          justify='center'
          >
            <a href="https://medium.com/jon-tinkers-with-stuff/my-serverless-resnet-50-classifier-a5d78b6b6095">
            <Button className="blog-link" size={'large'} color="primary" variant="contained">Read more at my blog!</Button></a>
          </Grid>
    </footer>
  );
}

export default Footer;