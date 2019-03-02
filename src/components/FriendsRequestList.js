import React, { Component } from 'react';
import {redirectPage,checkIsLogin,apiUrl,responseMessage} from '../Functions';
import Topmenu from '../components/Topmenu';
export default class FriendsRequestList extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      friends:[],
      friends_id:[],
      image_path:'',
      default_image:''
    };
    this.fetchFriendsRequest();
    this.confirmRequest = this.confirmRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }
  fetchFriendsRequest(){
    var user_id = localStorage.getItem("user_id");
    fetch(apiUrl()+"get-friends-request?user_id="+user_id)
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                isLoaded: true,
                friends: result.friends,
                image_path: result.image_path,
                default_image: result.default_image,
                friends_id:result.friends_id
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
confirmRequest(id){
    const formData = {};

    // for (const field in this.refs) {
    //   formData[field] = this.refs[field].value;
    // }
    formData['id'] = id;
    var token = localStorage.getItem('_token');
    formData['user_id'] = localStorage.getItem('user_id');
    
    
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"confirm-request?_token="+token,{
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
                this.fetchFriendsRequest();
                //redirectPage('/dashboard');
                
            }
       
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

rejectRequest(id){
    const formData = {};

    // for (const field in this.refs) {
    //   formData[field] = this.refs[field].value;
    // }
    formData['id'] = id;
    var token = localStorage.getItem('_token');
    formData['user_id'] = localStorage.getItem('user_id');
    
    
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"reject-request?_token="+token,{
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
                this.fetchFriendsRequest();
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

cancelRequest(user_id){
    const formData = {};

    formData['user_id'] = user_id;
    var token = localStorage.getItem('_token');
    formData['friend_id'] = localStorage.getItem('user_id');
    
    
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"cancel-request?_token="+token,{
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
                this.fetchFriends();
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

render () {     
      const { error, isLoaded,isLogin,friends,image_path,default_image } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
            return(<div className="friends-list">
                    <div class="bootstrap snippet">
                        <div class="jumbotron list-content">
                            <ul className={(friends.length <= 0)?'hide':''}>
                                <li href="#" class="list-group-item title">
                                    Friends Request
                                </li>
                                {friends.map(frnd => (
                                <li href="#" class="list-group-item text-left">
                                    <img class="img-thumbnail" src="https://bootdey.com/img/Content/User_for_snippets.png" />
                                    <label class="name">
                                        {frnd.from_user_info.username}
                                    </label>
                                    <label class="pull-right">
                                        
                                        <div className={(frnd.request_status == 'waiting')?'pull-left':'hide'}>
                                            <button onClick={() => this.confirmRequest(frnd.id)} type="button" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Confirm"></button>
                                        </div>
                                        <div className={(frnd.request_status == 'confirm')?'pull-left':'hide'}>
                                            <span type="button" class="btn text-success" title="Cancel Request">Confirmed</span>
                                        </div>
                                        <div className="pull-left">
                                            <button onClick={() => this.cancelRequest(frnd.user_id)} type="button" class="btn btn-danger btn-lg glyphicon glyphicon-remove" title="Reject"></button>
                                        </div>
                                    </label>
                                    <div class="break"></div>
                                </li>
                                ))}
                            </ul>

                            <div className={(friends.length > 0)?'hide':''}>
                                    <div class="alert alert-danger">No friend request</div>
                            </div>
                    </div>
                </div>
            </div>
            )
        }
    }
      
    componentDidMount() {
        this.interval = setInterval(() => this.fetchFriendsRequest(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}