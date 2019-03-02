import React, { Component } from 'react';
import {render} from 'react-dom';

import {redirectPage,apiUrl,checkIsLogin} from '../Functions';

import Header from '../components/Header';
import Footer from '../components/Footer';
export default class SignIn extends Component { 

    state = {};
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            isLogin:checkIsLogin()
          };
        this.getLogin = this.getLogin.bind(this);
      }  
        

    login(formData){
        fetch(apiUrl()+"get-login?email="+formData['email']+"&password="+formData['password'])
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
  getLogin(e){
    const formData = {};

    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
     // alert(this.refs[field].value);
    }
    this.login(formData);
    // fetch("http://localhost/projects/buildables/api/get-login",{
    //     body: 'email='+formData['email']+'&password='+formData['password']
    // })
    // .then(res => res.json())
    // .then(
    //     (result) => {
    //         alert("success");
    //         //alert(JSON.stringify(result));
    //     },
    //     (error) => {
           
    //         alert(JSON.stringify(error));
    //     }
    // )
  }
  
  render () {          
    const { error, isLoaded,isLogin } = this.state;
    if(isLogin == true){
        redirectPage('/dashboard');
    }                         
      return (
        <div className="loginpage">
             <Header />
             <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4 loginform">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> Login </strong>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <fieldset>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span> 
                                                        <input ref="email" className="form-control" placeholder="Email" name="email" type="text" autofocus />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span> 
                                                        <input ref="password" className="form-control" placeholder="Password" name="password" type="password" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input  onClick={this.getLogin} type="button" className="btn btn-lg btn-primary btn-block" value="Sign in" />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer ">
                                Don't have an account! <a href="signup"> Sign Up Here </a>
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