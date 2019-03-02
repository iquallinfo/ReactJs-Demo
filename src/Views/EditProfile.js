import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {redirectPage,apiUrl,checkIsLogin} from '../Functions';
export default class EditProfile extends Component { 
     state = {};
     constructor(props) {
         super(props);
         this.state = {
             error: null,
             updatable: true,
             isLoaded: true,
             userinfo:[],
             username:'',
             email:'',
             firstname:'',
             lastname:'',
             password:'',
             phoneno:'',
             country:'',
             isLogin:checkIsLogin()
           };
         this.submitProfile = this.submitProfile.bind(this);
         this.handleChange = this.handleChange.bind(this);  
         this.fetchUser();
    }  
         
    fetchUser(){
        var userid = localStorage.getItem("user_id");
        fetch(apiUrl()+"get-user-info?id="+userid)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                userinfo: result.userinfo,
                username:result.userinfo.username,
                email:result.userinfo.email,
                firstname:result.userinfo.firstname,
                lastname:result.userinfo.lastname,
                password:result.userinfo.password,
                phoneno:result.userinfo.phoneno,
                country:result.userinfo.country,
            });
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
     editProfile(formData){
       
         fetch(apiUrl()+"edit-profile",{
               method: 'POST',
               body: JSON.stringify(formData)
         })
         .then(res => res.json())
         .then(
             (result) => {
                 if(result.status !== 'true'){
                     alert(result.message);
                 }else{
                    alert(result.message);
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
     handleChange (e) {
        var key = e.target.name;
        
        this.setState({
            key:e.target.value
        });
      }
     submitProfile(e){
     const formData = {};
 
     for (const field in this.refs) {
       formData[field] = this.refs[field].value;
      // alert(this.refs[field].value);
     }
     this.editProfile(formData);

   }
   
   render () {          
     const { error, isLoaded,isLogin,userinfo } = this.state;
     if(isLogin != true){
         redirectPage('/signin');
     }                         
       return (
         <div class="signuppage">
              <Header />
              <div className="container">
                 <div className="row">
                     <div className="col-sm-6 col-md-4 col-md-offset-4">
                         <div className="panel panel-default">
                             <div className="panel-heading">
                                 <strong> Edit Profile </strong>
                             </div>
                             <div className="panel-body">
                                 <form>
                                     <fieldset>
                                         <div className="row">
                                             <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-envelope"></i>
                                                         </span> 
                                                         <input ref="id" value={userinfo.id} type="hidden" />
                                                         <input ref="email" className="form-control" onChange={this.handleChange} placeholder="Email" name="email" type="text"  value={this.state.email} />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="username" value={userinfo.username} className="form-control" onChange={this.handleChange} placeholder="Username" name="username" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="firstname" value={userinfo.firstname} className="form-control" onChange={this.handleChange} placeholder="First Name" name="firstname" type="text" />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="lastname" value={userinfo.lastname} className="form-control" onChange={this.handleChange} placeholder="Last Name" name="lastname" type="text" />
                                                     </div>
                                                 </div>
                                                
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-phone"></i>
                                                         </span> 
                                                         <input ref="phoneno" value={userinfo.phoneno} className="form-control" onChange={this.handleChange} placeholder="Phone No" name="phoneno" type="text" />
                                                     </div>
                                                 </div>

                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-globe"></i>
                                                         </span> 
                                                         <input ref="country" value={userinfo.country} className="form-control" onChange={this.handleChange} placeholder="Country" name="country" type="text" />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-lock"></i>
                                                         </span> 
                                                         <input ref="password" className="form-control" placeholder="Password" name="password" type="password" />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <input  onClick={this.submitProfile} type="button" className="btn btn-lg btn-primary btn-block" value="Sign in" />
                                                 </div>
                                             </div>
                                         </div>
                                     </fieldset>
                                 </form>
                             </div>
                             <div className="panel-footer ">
                                 Already a member! <a href="signin"> Sign In </a>
                             </div>
                         </div>
                     </div>
                 </div>
              </div>
              <Footer />
         </div>
       )
    }
}