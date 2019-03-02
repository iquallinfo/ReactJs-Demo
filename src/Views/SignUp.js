import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {redirectPage,apiUrl,checkIsLogin} from '../Functions';
export default class SignUp extends Component { 
     state = {};
     constructor(props) {
         super(props);
         this.state = {
             error: null,
             isLoaded: true,
             isLogin:checkIsLogin()
           };
         this.getRegister = this.getRegister.bind(this);
       }  
         
 
     register(formData){
         
         fetch(apiUrl()+"get-register",{
               method: 'POST',
               body: JSON.stringify(formData),
         })
         .then(res => res.json())
         .then(
             (result) => {
                 if(result.status !== 'true'){
                     alert(result.message);
                 }else{
                     localStorage.setItem('_token', result.token);
                     localStorage.setItem('user_name', result.user_name);
                     localStorage.setItem('user_id', result.user_id);
                     localStorage.setItem('isLogin', 'true');
                     alert(result.message);
                     
                     redirectPage('/dashboard');
                     
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
   getRegister(e){
     const formData = {};
 
     for (const field in this.refs) {
       formData[field] = this.refs[field].value;
      // alert(this.refs[field].value);
     }
     this.register(formData);

   }
   
   render () {          
     const { error, isLoaded,isLogin } = this.state;
     if(isLogin == true){
         redirectPage('/dashboard');
     }                         
       return (
         <div className="signuppage">
              <Header />
              <div className="container">
                 <div className="row">
                     <div className="col-sm-6 col-md-4 col-md-offset-4">
                         <div className="panel panel-default">
                             <div className="panel-heading">
                                 <strong> Register </strong>
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
                                                         <input ref="email" className="form-control" placeholder="Email" name="email" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="username" className="form-control" placeholder="Username" name="username" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="firstname" className="form-control" placeholder="First Name" name="firstname" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-user"></i>
                                                         </span> 
                                                         <input ref="lastname" className="form-control" placeholder="Last Name" name="lastname" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-phone"></i>
                                                         </span> 
                                                         <input ref="phoneno" className="form-control" placeholder="Phone No" name="phoneno" type="text" autofocus />
                                                     </div>
                                                 </div>
                                                 <div className="form-group">
                                                     <div className="input-group">
                                                         <span className="input-group-addon">
                                                             <i className="glyphicon glyphicon-globe"></i>
                                                         </span> 
                                                         <input ref="country" className="form-control" placeholder="Country" name="country" type="text" autofocus />
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
                                                     <input  onClick={this.getRegister} type="button" className="btn btn-lg btn-primary btn-block" value="Sign in" />
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