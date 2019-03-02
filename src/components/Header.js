import React, { Component } from 'react';
import {redirectPage,checkIsLogin} from '../Functions';



export default class Header extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      username:localStorage.getItem("user_name"),
      isLogin:checkIsLogin()
    };
    
    
  }
  render () {     
      const { error, isLoaded,isLogin,username } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
          if(isLogin == true){
            return (<header>
                    <nav className="navbar navbar-transparent">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Social Connect</a>
                            </div>
                            <ul className="nav navbar-nav pull-right">
                                <li><a role="menuitem" tabindex="-1" href="/dashboard">Dashboard</a></li>
                                <li>
                                    <div class="dropdown">
                                        <button class="btn btn-default userinfo dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">{username}
                                        <span class="caret"></span></button>
                                        <ul class="dropdown-menu udm" role="menu" aria-labelledby="menu1">
                                        <li role="presentation"><a role="menuitem" tabindex="-1" href="/edit-profile">Edit Profile</a></li>
                                        <li role="presentation" class="divider"></li>
                                        <li role="presentation"><a role="menuitem" tabindex="-1" href="logout">Logout</a></li>    
                                        </ul>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </nav>
                </header>
            )
          }else{                              
              return (
                
                <header>
                    <nav className="navbar navbar-transparent">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Social Connect</a>
                            </div>
                            <ul className="nav navbar-nav pull-right">
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="/products">Products</a></li>
                                <li><a href="signup">Sign Up</a></li>
                                <li><a href="signin">Sign In</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>
              )
          }
      }
    }
}