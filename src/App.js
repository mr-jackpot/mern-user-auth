import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import LoginRedirect from './pages/LoginRedirect/LoginRedirect';

function App() {
  
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Enter your username and password.
              </p>
              <Login />
            </header>
          </div>
        </Route>
        <Route path="/session">
          <LoginRedirect />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
