import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';

export const apiUrl=()=>{
    var url ='http://demo1.i-quall.com/social-media-api/api/';
    
    return url;
}

export const redirectPage=(page)=>{
    const history = createHistory();  
    history.replace(page);
    window.location.reload();
}

export const checkIsLogin=()=>{
    const history = createHistory();  
    
    if (localStorage.getItem("isLogin") === null) {
        return false;
    }else{
        return true;
    }
}

export const AuthUser=()=>{
    var user = [];
    user['username'] = localStorage.getItem('user_name');
    user['user_id'] = localStorage.getItem('user_id');

    return user;
}

export const responseMessage=(type,message) =>{
    if(type == 'success'){
        
        toastr.success(message, 'Success', {"closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"})
    }
    
    if(type == 'error'){
        toastr.error(message, 'Error', {"closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"})
    }
    
}


