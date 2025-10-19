import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import homeBg from '../assets/images/homebg.jpg';  // Correct import

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${homeBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  text: {
    color: 'white',  // Set the text color to white
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Typography variant="h2" gutterBottom className={classes.text}>
        Welcome to Tater-check
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.text}>
        Your Potato Disease Classification Assistant
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Use the navigation menu to start uploading images and getting results.
      </Typography>
    </Container>
  );
};

export default Home;
