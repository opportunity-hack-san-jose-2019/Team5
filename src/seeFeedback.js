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
         ratings:[],
         authFlag:false
        }
        //Bind the handlers to this class
        


    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    componentDidMount(){
        // const {course_id} = this.props.match.params
        // let id= {course_id};
        axios.get("http://localhost:3001/seeFeedback")
                .then((response) => {
                //update the state with the response data
                // alert(response.data[0].skillRating);
                this.setState({
                    ratings : this.state.ratings.concat(response.data) 
                });
           
            });
    }
  

    render(){
       // redirect based on successful login
        let redirectVar = null;
        if(cookie.load('email')){
            redirectVar = <Redirect to= "/dashboard"/>
        }

                    //iterate over courses to create a table row
                    let details = this.state.ratings.map(item => {

                        return(

<>
                            <h5 style={{paddingLeft: 320,paddingTop:50}}>1. The Fellow speaks professionally {this.state.ratings.speakRating}</h5>
                            <Row style={{paddingLeft: 350}}>
                            <StarRatings
                            starRatedColor="gold"
                         rating={item.speakRating}
                         starDimension="40px"
                         starSpacing="15px"

                       />
                             </Row>


              
<hr/> 


            <h5 style={{paddingLeft: 320,paddingTop:50}}>2. The Fellow makes eye contact </h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.eyeContactRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>



            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>3. The Fellow has a solid handshake </h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.solidHandshakeRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>



            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>4. The Fellow uses professional body language (e.g. sitting up straight, not fidgeting with hands)</h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.bodyLanguageRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>


            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>5. The Fellow uses specific and relevant examples of experiences that demonstrate required skills</h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.relevantRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>
            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>6. The Fellow explains how their skills are transferable to future roles</h5>
           <Row style={{paddingLeft: 350}}>
           <StarRatings
                         rating={item.skillsRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>
            <hr/>

            <h5 style={{paddingLeft: 320,paddingTop:50}}>7. The Fellow is clear and concise</h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.clearRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>

            <hr/>



            <h5 style={{paddingLeft: 320,paddingTop:50}}>8. The Fellow reinforces connections through compelling storytelling</h5>
           <Row style={{paddingLeft: 350}}>
           <StarRatings
                         rating={item.compellingRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>

    
            <hr/>


            <h5 style={{paddingLeft: 320,paddingTop:50}}>9. The Fellow confidently persists in answering a question even if it is a difficult question</h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.confidentRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>


            <hr/>

            <h5 style={{paddingLeft: 320,paddingTop:50}}>10. The Fellow creates a personal connection with the interviewer (e.g. relates on personal background or a hobby)</h5>
           <Row style={{paddingLeft: 350}}> 
           <StarRatings
                         rating={item.connectionRating}
                         starDimension="40px"
                         starSpacing="15px"
                         starRatedColor="gold"
                       />
            </Row>
            <hr/>

<div style={{paddingLeft: 320,paddingTop:50}}>
<h4 >Additional Comments: </h4><p>{item.additionalComments}</p>
</div>


                             </>
                        )
                    })
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
<h3 style={{paddingLeft: 320,paddingTop:50}}>Feedback for the interview</h3>
            {details}
<br/>
<br/>
            </>
        )
    }
}


export default FeedbackForm;