import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import ImageUpload from './components/Imageupload';
import About from './components/about';
import SolutionPage from './components/SolutionPage'; // Fixed path

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/upload" component={ImageUpload} />
        <Route path="/solution/:disease" component={SolutionPage} />
      </Switch>
    </Router>
  );
};

export default App;
