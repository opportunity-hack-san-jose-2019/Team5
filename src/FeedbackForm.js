import React, { Component } from 'react';
import { Textarea,SideNav, SideNavItem, MediaBox, Row, Col, Card, Button } from 'react-materialize';
import {Route} from 'react-router-dom';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'materialize-css/dist/css/materialize.min.css';
import {Link} from 'react-router-dom';

// import {connect} from 'react-redux';
// import {authUser} from './actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

import StarRatings from 'react-star-ratings';
 
//Define a Login Component
class FeedbackForm extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            speakRating:0,
            eyeContactRating:0,
            solidHandshakeRating:0,
            bodyLanguageRating:0,
            relevantRating:0,
            skillsRating:0,
            clearRating:0,
            compellingRating:0,
            confidentRating:0,
            connectionRating:0,
            comment:"",
            error_message:""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);
        this.changeSpeakRating = this.changeSpeakRating.bind(this);
        this.changeEyeContactRating = this.changeEyeContactRating.bind(this);
        
        this.changeSolidHandshake = this.changeSolidHandshake.bind(this);
        this.changeBodyLanguage = this.changeBodyLanguage.bind(this);
        this.changeRelevant = this.changeRelevant.bind(this);
        this.changeSkills = this.changeSkills.bind(this);
        
        this.changeClear = this.changeClear.bind(this);
        this.changeCompelling = this.changeCompelling.bind(this);
        this.changeConfident = this.changeConfident.bind(this);
        this.changeConnection = this.changeConnection.bind(this);
        this.changeComment = this.changeComment.bind(this);
        
        
        


    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
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
    
    changeSpeakRating( newRating, name ) {
          this.setState({
            speakRating: newRating
          });
        }
        changeEyeContactRating( newRating, name ) {
            this.setState({
                eyeContactRating: newRating
            });
          }
          changeSolidHandshake( newRating, name ) {
            this.setState({
                solidHandshakeRating: newRating
            });
          }
          changeBodyLanguage( newRating, name ) {
            this.setState({
                bodyLanguageRating: newRating
            });
          }
          changeRelevant( newRating, name ) {
            this.setState({
                relevantRating: newRating
            });
          }
          changeSkills( newRating, name ) {
            this.setState({
                skillsRating: newRating
            });
          }
          changeClear( newRating, name ) {
            this.setState({
                clearRating: newRating
            });
          }
          changeCompelling( newRating, name ) {
            this.setState({
               compellingRating: newRating
            });
          }
          changeConfident( newRating, name ) {
            this.setState({
                confidentRating: newRating
            });
          }
          changeConnection( newRating, name ) {
            this.setState({
                connectionRating: newRating
            });
          }
          changeComment( newcomment ) {
            this.setState({
                comment: newcomment.target.value
            });
          }
  
    //submit Login handler to send a request to the node backend
    submitFeedback = (e) => {
        
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            userId:"5dbe49df55101e1d144f4aa4",
            speakRating:this.state.speakRating,
            eyeContactRating:this.state.eyeContactRating,
            solidHandshakeRating:this.state.solidHandshakeRating,
            bodyLanguageRating:this.state.bodyLanguageRating,
            relevantRating:this.state.relevantRating,
            skillsRating:this.state.skillsRating,
            clearRating:this.state.clearRating,
            compellingRating:this.state.compellingRating,
            confidentRating:this.state.confidentRating,
            connectionRating:this.state.connectionRating,
            comment:this.state.comment
        }
        alert(this.state.comment);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/feedback',data)
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
        let redirectVar = null;
        if(cookie.load('email')){
            redirectVar = <Redirect to= "/dashboard"/>
        }
        return(
            <>
            <SideNav fixed={true}>
                <MediaBox style={{paddingLeft: 20, paddingTop:20}}>
                    <img src="http://localhost:3000/images/profile.png" width="150" alt="" />
                </MediaBox>
                <SideNavItem>
                    <h6 class="userName">John Doe</h6>
                </SideNavItem>
                <SideNavItem divider />
                <SideNavItem>
                    My Events
                </SideNavItem>
                <SideNavItem>
                    Feedback
                </SideNavItem>
                <SideNavItem>
                    Sign Out
                </SideNavItem>
            </SideNav>



            <h1 style={{paddingLeft: 320}}>Give feedback for </h1>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>1. The Fellow speaks professionally </h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.speakRating}
          starRatedColor="gold"
          changeRating={this.changeSpeakRating}
          numberOfStars={5}
          name='rating'
          starDimension="30px"
        />
            </Row>
<hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>2. The Fellow makes eye contact </h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.eyeContactRating}
          starRatedColor="gold"
          changeRating={this.changeEyeContactRating}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>



            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>3. The Fellow has a solid handshake </h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.solidHandshakeRating}
          starRatedColor="gold"
          changeRating={this.changeSolidHandshake}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>



            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>4. The Fellow uses professional body language (e.g. sitting up straight, not fidgeting with hands)</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.bodyLanguageRating}
          starRatedColor="gold"
          changeRating={this.changeBodyLanguage}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>


            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>5. The Fellow uses specific and relevant examples of experiences that demonstrate required skills</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.relevantRating}
          starRatedColor="gold"
          changeRating={this.changeRelevant}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>
            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>6. The Fellow explains how their skills are transferable to future roles</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.skillsRating}
          starRatedColor="gold"
          changeRating={this.changeSkills}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>
            <hr/>

            <h5 style={{paddingLeft: 320,paddingTop:50}}>7. The Fellow is clear and concise</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.clearRating}
          starRatedColor="gold"
          changeRating={this.changeClear}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>

            <hr/>



            <h5 style={{paddingLeft: 320,paddingTop:50}}>8. The Fellow reinforces connections through compelling storytelling</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.compellingRating}
          starRatedColor="gold"
          changeRating={this.changeCompelling}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>

    
            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>9. The Fellow confidently persists in answering a question even if it is a difficult question</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.confidentRating}
          starRatedColor="gold"
          changeRating={this.changeConfident}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>


            <hr/>

            <h5 style={{paddingLeft: 320,paddingTop:50}}>10. The Fellow creates a personal connection with the interviewer (e.g. relates on personal background or a hobby)</h5>
           <Row style={{paddingLeft: 350}}> <StarRatings
          rating={this.state.connectionRating}
          starRatedColor="gold"
          changeRating={this.changeConnection}
          numberOfStars={5}
          name='eyecontact'
          starDimension="30px"
        />
            </Row>
            <hr/>
            <Row style={{paddingLeft: 320,paddingTop:50}}>
                   <Textarea
                   onChange = {this.changeComment} 
                   placeholder="Additional Comments"
                    s={12}
                    m={12}
                    l={12}
                    xl={12}
                    />
                    </Row>
      {/* <input onChange = {this.changeComment} type="text" class="form-control" name="city" placeholder="City"/> */}
<Button onClick={this.submitFeedback} style={{marginLeft: 750}}>Send Report</Button>
<br/>
<br/>
<br/>
            </>
        )
    }
}


export default FeedbackForm;