import React, { Component } from "react";

import {Route, Switch } from "react-router";
import "./App.css";

import MapPage from './pages/MapPage/MapPage';


function App(){
    return (
        <Switch>
          <Route path='/MapPage'>
            <MapPage />
          </Route>
          <Route path='/'>
            <MapPage />
          </Route>
        </Switch>
    );
}

export default App;
