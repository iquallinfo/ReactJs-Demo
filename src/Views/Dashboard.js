import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Leftpanel from '../components/Leftpanel';
import Addpost from '../components/Addpost';
import Viewposts from '../components/Viewposts';

import {redirectPage,checkIsLogin,AuthUser} from '../Functions';


export default class Dashboard extends Component { 
 
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        username:AuthUser(),
        isLogin:''
      };
      
    }
    
  
  render () {
    
        const { error, isLoaded, isLogin, username,timelinecover,profileimg } = this.state;
        if(isLogin == true){
          redirectPage('/signin');
        }  
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            
            <div class="mainwrapper">
            <Header />
              <div class="container">

                <div className="timeline-cover-image" style={timelinecover}>
                  <div className="profileimage" style={profileimg}>
                  </div>
                </div>
                <div className="content-wrapper">
                  <div className="row">
                    <Leftpanel />
                    <div className="col-md-9 col-sm-12 col-lg-9">
                        <Addpost />
                    </div>
                    <div className="col-md-9 col-sm-12 col-lg-9">
                      <Viewposts />
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
             </div>
              
              <Footer />
            </div>
          );
        }
      }
}
