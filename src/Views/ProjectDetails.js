import React, { Component } from 'react';
import queryString from 'query-string';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {apiUrl} from '../Functions';

export default class ProjectDetails extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      project: [],
      slug:this.props.match.params.slug
    };
    this.fetchProject();
  }
 
fetchProject(){
 
  fetch(apiUrl()+"get-project-info/"+this.props.match.params.slug)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          project: result.project
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
  this.interval = setInterval(() => this.fetchProject(), 100000);
}
componentWillUnmount() {
  clearInterval(this.interval);
}
render () {
  
      const { error, isLoaded, project } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          
          <div class="container">
          <Header />
            <div className="block-heading">
             <h2>Project Details</h2>
           </div>
            
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 project-details">
                <div className="panel panel-primary post-block">
                    <div class="panel-heading">{project.project_title}</div>
                    <div class="panel-body">
                      <div className="bannerimg">
                      
                        <img src={project.banner_image} width="100%" height="200" />
                      </div>
                      <div class="post-desp">
                      {project.additional_project_details}
                      </div>
                    </div>
                </div>
              </div>
            
            <Footer />
          </div>
        );
      }
    }
}