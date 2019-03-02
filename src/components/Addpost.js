import React, { Component } from 'react';
import {redirectPage,checkIsLogin,apiUrl,responseMessage} from '../Functions';
import Topmenu from '../components/Topmenu';
export default class Addpost extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
    };
    this.sharePost = this.sharePost.bind(this);
  }
  render () {     
      const { error, isLoaded,isLogin } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
            return(<div className="addpost-block">
                <form id="addPostForm">
                  <div className="text-area">
                      <textarea ref="comment" className="form-control" placeholder="What's in your mind?" rows="5"></textarea>
                  </div>
                  <div className="sharebtn">
                  <button type="button"  onClick={this.sharePost} class="btn btn-primary">Share your post</button>
                  </div>
                </form>
            </div>
            )
        }
    }

  sharePost(e){
    const formData = {};

    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    formData['user_id'] = localStorage.getItem('user_id');
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"add-post?_token="+token,{
          method: 'POST',
          body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(
        (result) => {
            if(result.status !== 'true'){
                responseMessage("error",result.message);
            }else{
                responseMessage("success",result.message);
                document.getElementById("addPostForm").reset();
                //redirectPage('/dashboard');
                
            }
        /*this.setState({
            isLoaded: true,
            projects: result.projects
        });*/
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
}