import React from 'react';
import logo from './logo.svg';
import './App.css';
import HypertensionScreen from "./screens/HypertensionScreen";
import KidneyDiseaseScreen from "./screens/KidneyDiseaseScreen";
import {Component} from 'react';
import {Route, HashRouter as Router} from 'react-router-dom';
import HISTORY  from "./screens/navigation/history";
import HomeScreen from "./screens/HomeScreen";
class App extends Component {

  render() {

    return (
          <Router history={HISTORY}>
            <Route exact={true} path="/"component={HomeScreen}/>
            <Route path="/heart-disease" component={HypertensionScreen}/>
            <Route path="/kidney-disease" component={KidneyDiseaseScreen}/>
          </Router>
    );
  }
}


export default App;
