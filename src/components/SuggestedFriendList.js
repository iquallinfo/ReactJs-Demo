import React, { Component } from 'react';
import {redirectPage,checkIsLogin,apiUrl,responseMessage} from '../Functions';
import Topmenu from '../components/Topmenu';
export default class SuggestedFriendList extends Component { 
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
    this.fetchFriends();
    this.addFriend = this.addFriend.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }
    fetchFriends(){
        var user_id = localStorage.getItem("user_id");
        fetch(apiUrl()+"get-suggested-friends?user_id="+user_id)
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
rejectFriend(e){
}
addFriend(friend_id){
    const formData = {};

    // for (const field in this.refs) {
    //   formData[field] = this.refs[field].value;
    // }
    formData['friend_id'] = friend_id;
    var token = localStorage.getItem('_token');
    formData['user_id'] = localStorage.getItem('user_id');
    
    
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"add-friend?_token="+token,{
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

cancelRequest(friend_id){
    const formData = {};

    // for (const field in this.refs) {
    //   formData[field] = this.refs[field].value;
    // }
    formData['friend_id'] = friend_id;
    var token = localStorage.getItem('_token');
    formData['user_id'] = localStorage.getItem('user_id');
    
    
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
                            <ul class="list-group">
                                <li href="#" class="list-group-item title">
                                    Suggested Friends
                                </li>
                                {friends.map(frnd => (
                                <li href="#" class="list-group-item text-left">
                                    <img class="img-thumbnail" src="https://bootdey.com/img/Content/User_for_snippets.png" />
                                    <label class="name">
                                        {frnd.username}
                                    </label>
                                    <label class="pull-right">
                                        
                                        <div className={(frnd.request_status == '')?'pull-left':'hide'}>
                                            <button onClick={() => this.addFriend(frnd.id)} type="button" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Add Friend"></button>
                                        </div>
                                        <div className={(frnd.request_status != '')?'pull-left':'hide'}>
                                            <button onClick={() => this.cancelRequest(frnd.id)} type="button" class="btn btn-default btn-lg glyphicon glyphicon-remove" title="Cancel Request">Cancel</button>
                                        </div>
                                    </label>
                                    <div class="break"></div>
                                </li>
                                ))}
                            </ul>
                    </div>
                </div>
            </div>
            )
        }
    }
      
    componentDidMount() {
        this.interval = setInterval(() => this.fetchFriends(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}