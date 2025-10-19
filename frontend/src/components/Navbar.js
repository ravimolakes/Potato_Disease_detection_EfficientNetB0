import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  appbar: {
    background: '#be6a77',
    boxShadow: 'none',
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tater Check
        </Typography>
        <Button color="inherit">
          <Link to="/" className={classes.link}>
            Home
          </Link>
        </Button>

        <Button color="inherit" component={Link} to="/about">About Us</Button> {}

        <Button color="inherit">
          <Link to="/upload" className={classes.link}>
            Upload
          </Link>
        </Button>
        {/* Add other navigation links as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
