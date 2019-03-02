import React, { Component } from 'react';
import {redirectPage,checkIsLogin} from '../Functions';
import Topmenu from '../components/Topmenu';
export default class Leftpanel extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
    };
    
  }
  render () {     
      const { error, isLoaded,isLogin } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
            return(
            <aside>
                <Topmenu />
                    <div className="col-md-3 col-sm-12 col-lg-3">
                        <div className="menuleft">
                            <ul>
                                <li><a href="/dashboard">Dashboard</a></li>
                                {/* <li><a href="#">Timeline</a></li> */}
                                
                                <li><a href="/my-friends">My Friends</a></li>
                                <li><a href="/friends-request">Friends Request</a></li>
                                <li><a href="/suggested-friends">Friends Suggestion</a></li>
                                <li><a href="/edit-profile">Edit Profile</a></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </aside>
            )
        }
    }
}