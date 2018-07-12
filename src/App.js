import React, { Component } from 'react';
import Chat from './Chat';
import Login from './Login'
import SessionCheck from './SessionCheck';
import socketIOClient from 'socket.io-client';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
const socket = socketIOClient();


class App extends Component {
  
  render() {
    return (
      <div className="App">
            <Switch>
              <Route exact path='/'  render={() => {
                return <Login socket={socket} />}}/>

              <Route path='/chat/:room'render={() => {
                return <Chat socket={socket} />}}/>

              <Route path='/sessioncheck' render={() => {
                return <SessionCheck socket={socket} />}}/>

              <Route path='*' render={() => {
                return <Redirect to='/'/>
              }}/>
            </Switch>
      </div>
    );
  }
}

export default App;