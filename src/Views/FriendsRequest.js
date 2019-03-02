import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Leftpanel from '../components/Leftpanel';
import FriendsRequestList from '../components/FriendsRequestList';
import {redirectPage,checkIsLogin,AuthUser} from '../Functions';


export default class FriendsRequest extends Component { 
 
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        username:AuthUser(),
      };
      
    }
    
  fetchProjects(){
    // fetch("http://localhost/projects/buildables/api/get-projects")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         projects: result.projects
    //       });
    //       //alert(JSON.stringify(result));
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //       alert("error");
    //     }
    //   )
  }  
  // componentDidMount() {
  //   this.interval = setInterval(() => this.fetchProjects(), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  render () {
    
        const { error, isLoaded, username,timelinecover,profileimg } = this.state;
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
                      <FriendsRequestList />
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