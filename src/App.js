import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Home from './Views/Home';
import SignUp from './Views/SignUp';
import SignIn from './Views/SignIn';
import Dashboard from './Views/Dashboard';
import EditProfile from './Views/EditProfile';
import Logout from './Views/Logout';
import SuggestedFriendList from './components/SuggestedFriendList';
import SuggestedFriends from './Views/SuggestedFriends';
import FriendsRequest from './Views/FriendsRequest';
import MyFriends from './Views/MyFriends';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <SignIn />
            </div>
          )}/>
          
          
          <Route exact={true} path='/signup' render={() => (
            <div className="App">
              <SignUp />
            </div>
          )}/>
           <Route exact={true} path='/signin' render={() => (
            <div className="App">
              <SignIn />
            </div>
          )}/>
          <Route exact={true} path='/edit-profile' render={() => (
            <div className="App">
              <EditProfile />
            </div>
          )}/>
          <Route exact={true} path='/suggested-friends' render={() => (
            <div className="App">
              <SuggestedFriends />
            </div>
          )}/>
          <Route exact={true} path='/friends-request' component={FriendsRequest} render={() => (
            <div className="App">
              <FriendsRequest />
            </div>
          )}/>
          <Route exact={true} path='/my-friends' component={MyFriends} render={() => (
            <div className="App">
              <MyFriends />
            </div>
          )}/>
           <Route exact={true} path='/logout' render={() => (
            <div className="App">
              <Logout />
            </div>
          )}/>
          <Route exact={true} path='/dashboard' render={() => (
            <div className="App">
              <Dashboard />
            </div>
          )}/>


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
