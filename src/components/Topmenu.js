import React, { Component } from 'react';
import {redirectPage,checkIsLogin} from '../Functions';


export default class Topmenu extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
    };
    
  }
  render () {     
      const { error, isLoaded,isLogin } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
            return(<div class="col-md-12">
                <div class="top-menu">
                    <div className="menutop">
                        <ul>
                            <li><a href="#">Friends</a></li>
                            <li><a href="#">Photos</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </div>)
        }
    }
}