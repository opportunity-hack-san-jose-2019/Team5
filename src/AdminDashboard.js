import React, { Component } from 'react';
import { SideNav, SideNavItem, MediaBox, Row, Col, Card, Button, Modal, DatePicker, TimePicker, Divider } from 'react-materialize';
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
import Container from 'react-materialize/lib/Container';
// import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

//Define a Login Component
class AdminDashboard extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            error_message:"",
            dateSelected: '',
            timeSelected: '',
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.onDateSelection = this.onDateSelection.bind(this);
        this.onTimeSelection = this.onTimeSelection.bind(this);
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
    //submit Login handler to send a request to the node backend
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

    addEvent = (e) => {

    }

    onDateSelection = async (date) => {
        var index = JSON.stringify(date).indexOf("T");
        await this.setState({
            dateSelected: JSON.stringify(date).substr(1, index-1)
        });
    }

    onTimeSelection = async (time) => {
        console.log("Time");
        console.log(time);
        // var index = JSON.stringify(date).indexOf("T");
        // await this.setState({
        //     dateSelected: JSON.stringify(date).substr(1, index-1)
        // });
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
                <SideNavItem href="http://localhost:3000/admin_dashboard">
                    My Events
                </SideNavItem>
                <SideNavItem>
                    Feedback
                </SideNavItem>
                <SideNavItem>
                    Sign Out
                </SideNavItem>
            </SideNav>
            <h1 style={{paddingLeft: 320}}>Events</h1>
            <Row style={{paddingLeft: 300}}>
                <Col m={4} s={4}>
                    <Card 
                        className="blue darken-1"
                        textClassName="white-text"
                        title="Event 1"
                        actions={[<a class='right' href="http://localhost:3000/showeventadmin">Go</a>]}
                        >
                        <h5>Location</h5>
                    </Card>
                </Col>
                <Col m={4} s={4}>
                    <Card 
                        className="blue darken-1"
                        textClassName="white-text"
                        title="Event 2"
                        actions={[<a class='right'>Go</a>]}
                        >
                        <h5>Location</h5>
                    </Card>
                </Col>
                <Col m={4} s={4}>
                    <Card 
                        className="blue darken-1"
                        textClassName="white-text"
                        title="Event 3"
                        actions={[<a class='right'>Go</a>]}
                        >
                        <h5>Location</h5>
                    </Card>
                </Col>
            </Row>
            <Row style={{paddingLeft: 300}}>

            </Row>
            <Container class="center" style={{paddingLeft: 300, paddingTop: 100}}>
            <Modal header="Add Event" fixedFooter trigger={<Button large class="center" onClick = {this.addEvent}  waves="light">Add Event</Button>}>
            <Divider/>
                <Container>
                    <Row>
                        <h5>Set Date : </h5>
                        <DatePicker onChange={this.onDateSelection}/>
                    </Row>
                    <Row>
                        <h5>Set Time : </h5>
                        <TimePicker onSelect={this.onTimeSelection}/>
                    </Row>
                </Container>
                <h4>The event will commence on {this.state.dateSelected}</h4>
            </Modal>
            </Container>
            </>
        )
    }
}


export default AdminDashboard;