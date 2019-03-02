import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {apiUrl,redirectPage} from '../Functions';
//import axios from 'axios';

export default class Home extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        projects: [],
        image_path:'',
        default_image:''
      };
      this.fetchProjects();
    }
    redirectTo(page){
      redirectPage('/project/'+page);
    }
  fetchProjects(){
    fetch(apiUrl()+"get-projects")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            projects: result.projects,
            image_path: result.image_path,
            default_image: result.default_image
          });
          //alert(JSON.stringify(result));
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          alert("error");
        }
      )
  }  
  componentDidMount() {
    this.interval = setInterval(() => this.fetchProjects(), 100000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render () {
    
        const { error, isLoaded, projects,image_path,default_image } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            
            <div class="container project-list">
            <Header />
              <div className="block-heading">
               <h2>Project List</h2>
             </div>
              {projects.map(item => (
                <div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                  <div className="panel panel-primary post-block">
                      <div class="panel-heading">{item.project_title}</div>
                      <div class="panel-body">
                        <div className="bannerimg">
                        
                          <img src={item.banner_image} width="100%" height="200" />
                        </div>
                        <div class="post-desp">
                        {item.additional_project_details}
                        </div>
                      </div>
                      <div class="panel-footer">
                      <input onClick={()=>this.redirectTo(item.slug)} type="button" className="btn btn-lg btn-primary btn-block" value="View More" />
                      </div>
                  </div>
                </div>
              ))}
              <Footer />
            </div>
          );
        }
      }
}