import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


import {redirectPage} from '../Functions';

export default class Logout extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        projects: []
      };
    }
   
  logout(){
    localStorage.clear();
    redirectPage('/signin')
  }  
  componentDidMount() {
    this.logout();
  }
  render () {
    
        const { error, isLoaded, projects } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            
            <div class="container">
            <Header />
              <div className="block-heading">
               <h2>Project List</h2>
             </div>
              {projects.map(item => (
                <div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                  <div className="panel panel-primary">
                      <div class="panel-heading">{item.project_title}</div>
                      <div class="panel-body">{item.additional_project_details}</div>
                  </div>
                </div>
              ))}
              <Footer />
            </div>
          );
        }
      }
}