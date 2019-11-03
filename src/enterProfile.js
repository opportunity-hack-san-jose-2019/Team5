import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

// import {connect} from 'react-redux';
// import {authUser} from './actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            major:"",
            position:"",
            careerIntersts:"",
            skills:"",
            phone:"",
            about_me:"",
            city:"",
            country:"",
            company:"",
            school:"",
            gender:"",
            companySize:0,
            authFlag : false,
            error_message:""
        }
        //Bind the handlers to this class
        this.majorChangeHandler = this.majorChangeHandler.bind(this);
        this.positionChangeHandler = this.positionChangeHandler.bind(this);

        this.skillsChangeHandler = this.skillsChangeHandler.bind(this);
        this.positionChangeHandler = this.positionChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.about_meChangeHandler = this.about_meChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);

        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.companySizeChangeHandler = this.companySizeChangeHandler.bind(this);



        this.submitLogin = this.submitLogin.bind(this);
        this.showStudent = this.showStudent.bind(this);
        this.showVolunteer = this.showVolunteer.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    majorChangeHandler = (e) => {
        this.setState({
            major : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    positionChangeHandler = (e) => {
        this.setState({
            position : e.target.value
        })
    }

    skillsChangeHandler = (e) => {
        this.setState({
            skills : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    about_meChangeHandler = (e) => {
        this.setState({
            about_me : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    countryChangeHandler = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }

    schoolChangeHandler = (e) => {
        this.setState({
            school : e.target.value
        })
    }

    genderChangeHandler = (e) => {
        this.setState({
            gender : e.target.value
        })
    }

    companySizeChangeHandler = (e) => {
        this.setState({
            companySize : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend

    showStudent()
    {
        
        document.getElementById("volunteerInfo").style.display = "none";
        document.getElementById("studentInfo").style.display = "block";
    }
    showVolunteer()
    {
        
        document.getElementById("studentInfo").style.display = "none";
        document.getElementById("volunteerInfo").style.display = "block";
    }
    submitLogin = (e) => {
        
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
              

                    // this.props.authUser(response.data);
                    this.setState({
                        authFlag : true,
                    error_message:"the username or password is wrong"
                    })
                
            });
    }

    render(){
       // redirect based on successful login
        // let redirectVar = null;
        // if(!cookie.load('email')){
        //     redirectVar = <Redirect to= "/dashboard"/>
        // }
        return(
        <div class="container-fluid">
                {/* {redirectVar} */}
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8">
                <br/>
                <br/>
                <br/>
                    <div class="login-box">


                 
                <h6 class="center">Complete Profile</h6>
                <hr/>

                <div class="row">
                <div class="col-md-6">
                <button class="btn btn-primary btn-lg full" onClick={this.showStudent}>Student</button>
                    </div>
                    <div class="col-md-6">
                    <button class="btn btn-primary btn-lg  full" onClick={this.showVolunteer}>Volunteer</button>
                    </div>
               </div>


                <br/>

            



                <div id="volunteerInfo">
            <div class="row">
                <div class="col-md-6">
                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.about_meChangeHandler} type="text" class="form-control" name="about_me" placeholder="About me"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder="City"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.countryChangeHandler} type="text" class="form-control" name="country" placeholder="Country"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.genderChangeHandler} type="text" class="form-control" name="gender" placeholder="Gender"/>
                                    </div>

                    </div>
                    <div class="col-md-6">


                    <div class="form-group">
                                    <input onChange = {this.positionChangeHandler} type="text" class="form-control" name="position" placeholder="Position at company"/>
                                    </div>
                                    <div class="form-group">
                              
                                    <input onChange = {this.careerInterstsChangeHandler} type="text" class="form-control" name="careerIntersts" placeholder="Career Intersts"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.skillsChangeHandler} type="text" class="form-control" name="skills" placeholder="Skills"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.companyChangeHandler} type="text" class="form-control" name="company" placeholder="Company"/>
                                    </div>
                               
                                    <div class="form-group">
                                    <input onChange = {this.companySizeChangeHandler} type="text" class="form-control" name="companySize" placeholder="Company Size"/>
                                    </div>
                                    <div class="form-group">
                    </div>
            </div>
                                  
                                  
                        
                
                                    </div>
               
                                    <button  class="btn btn-success full">Submit</button>    
                 </div>


                <div id="studentInfo">
                        <div class="form-group">
                        <input onChange = {this.careerInterstsChangeHandler} type="text" class="form-control" name="careerIntersts" placeholder="Career Intersts"/>
                        </div>
                        <div class="form-group">
                                    <input onChange = {this.skillsChangeHandler} type="text" class="form-control" name="skills" placeholder="Skills"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.about_meChangeHandler} type="text" class="form-control" name="about_me" placeholder="About me"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder="City"/>
                                    </div>
                                    <div class="form-group">
                                    <input onChange = {this.countryChangeHandler} type="text" class="form-control" name="country" placeholder="Country"/>
                                    </div>
                                    <div class="form-group">
                                  <input onChange = {this.genderChangeHandler} type="text" class="form-control" name="gender" placeholder="Gender"/>
                                  </div>
                              
                            <button class="btn btn-success full">Submit</button>    
                         


                </div>






                        
                            <br/>
                            <br/>
                            <p class="error_message">{this.state.error_message}</p>
                           
                   

                    </div>
                </div>
                <div class="col-md-2">








                </div>
             

            </div>
        </div>

        )
    }
}


export default Login;