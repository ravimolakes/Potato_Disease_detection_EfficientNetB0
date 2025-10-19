import React from 'react';
import { Typography, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import aboutBg from '../assets/images/aboutbg.jpg';  // Correct import

const useStyles = makeStyles((theme) => ({
  mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundImage: `url(${aboutBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  section: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Typography variant="h3" gutterBottom className={classes.text}>
        About Us
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" className={classes.heading}>
              Our Mission
            </Typography>
            <Typography variant="body1" className={classes.text}>
              Tater-check is dedicated to revolutionizing the agricultural industry by providing accurate and
              reliable potato disease classification. Our goal is to empower farmers with the tools they need to
              detect and address plant diseases at an early stage, ultimately enhancing crop yield and promoting
              sustainable farming practices.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" className={classes.heading}>
              Our Team
            </Typography>
            <Typography variant="body1" className={classes.text}>
              We are a team of passionate engineers, data scientists, and agricultural experts working together
              to innovate solutions that bridge technology and agriculture. With a focus on machine learning and
              AI, we aim to make a positive impact on global food production and sustainability.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
