import React, { Component } from 'react';
import { SideNav, SideNavItem, MediaBox, Row, Col, Card, Button, Table, Select } from 'react-materialize';
import {Route} from 'react-router-dom';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
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
class ShowEventStudent extends Component{
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
            showTable: false,
            filterValue: ''
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.generateData = this.generateData.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        });
        M.AutoInit();
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
    
    handleFilter = (e) => {
        this.setState({
            filterValue: e.target.value
        });
    }  
    generateData = async (e) => {
        await this.setState({
            showTable: true
        });
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            filter : this.state.filterValue,
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/showeventadmin', data)
            .then(response => {
                console.log("Status Code : ",response.status);
              

                    // this.props.authUser(response.data);
                    // this.setState({
                    //     authFlag : true,
                    // error_message:"the username or password is wrong"
                    // })
                
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
                <Container  style={{paddingLeft: 300, paddingTop: 100}}>
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="id">Slot number</th>
                                <th data-field="name">Table number</th>
                                <th data-field="price">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>20</td>
                                <td><Button class="center" waves="light">View Feedback</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}


export default ShowEventStudent;