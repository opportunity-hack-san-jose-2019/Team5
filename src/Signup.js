import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios';





 class Signup extends Component { 
    //call the constructor method
    constructor(props){
      //Call the constrictor of Super class i.e The Component
      super(props);
      //maintain the state required for this component
      this.state = {
          name:"",
          email : "",
          password : "",
          // user_type:"",
          authFlag : false,
          error_message:""
      }
      //Bind the handlers to this class
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);

      this.submitSignup = this.submitSignup.bind(this);
  }


      //name change handler to update state variable with the text entered by the user
      nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
      this.setState({
          email : e.target.value
      })
  }
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
      this.setState({
          password : e.target.value
      })
  }


// usertypeChangeHandler = (e) => {
//   this.setState({
//       user_type : e.target.value
//   })
// }

submitSignup = (e) => {
  var headers = new Headers();
  //prevent page from refresh
  e.preventDefault();
  const data = {
    name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      // user_type : this.state.user_type,
  }

  //set the with credentials to true
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post('http://localhost:3001/signup',data)
      .then(response => {
       
          console.log("Status Code : ",response);
          if(response.status === 200){
         
              this.setState({
                  authFlag : true,
                error_message:"username already taken"
              })
          }else{
              this.setState({
                  authFlag : false
              })
          }
      });
}



  render() {
                 //redirect based on successful login
                 let redirectVar = null;
                 if(cookie.load('email')){
                     redirectVar = <Redirect to= "/enterProfile"/>
                 }
    return (

      <div>
      {redirectVar}
  <div class="container-fluid">

  <div class="row">
  <div class="col-md-4">
  </div>
      <div class="col-md-4">
      <br/>
                <br/>
                <br/>
<div class="login-box">

                  <img class="center" src="http://localhost:3000/images/logo.png" height="100px" width="100%" alt="sorry, no display"/>
                                          <hr/>
                                          
                                  <h6 class="center">Sign Up</h6>
                                  <br/>
                                  <div class="form-group">
                            <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                    </div>
                    <div class="form-group">
                            <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                    </div>

                    <div class="form-group">
                            <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                    </div>

     
                          
                      <button onClick = {this.submitSignup} class="btn btn-primary full">Sign up</button> 
                      <br/>   <br/> 
                            <p class="error_message">{this.state.error_message}</p>
                          
                      
                      <br/>
                      <Link to="/login">Already have an account? Login here</Link>
</div>


      </div>
      <div class="col-md-4">





      </div>

  </div>









  </div>
  </div>
    );
  }
}



export default Signup;