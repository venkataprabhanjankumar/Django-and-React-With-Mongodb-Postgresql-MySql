import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import './style1.css';
import csrfToken from "./csrf";
class RegisterForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            username : '',
            password : '',
            email : '',
            mobilenumber : '',
            gender : '',
        }
    }
    componentDidMount() {
        axios.get("https://127.0.0.1:8000/authenticate/get_csrf",{
        withCredentials : true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        }).then(
            response=>{
                console.log(response.data)
                console.log(response.headers)
            }
        )
    }
    handleChange=(event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value})
        event.stopPropagation()
    }
    handleCheckPassword=(event)=>{
        if(event.target.value !== this.state.password){
            document.getElementById('passwordMsg').innerText = "Password Not Matched"
        }
        else {
            document.getElementById('passwordMsg').innerText = ""
        }
        event.stopPropagation()
    }
    handleSubmit=(event)=>{
        console.log(this.state)
        event.preventDefault();
        axios.post("https://127.0.0.1:8000/authenticate/register",this.state,{
            withCredentials : true,
            headers : {
                'X-CSRFToken' : csrfToken('csrftoken')
            }
        }).then(
            response=>{
                if(response.data['status_msg']==='Ok'){
                    document.getElementById('registerMsg').innerHTML="<p>"+response.data['msg']+"</p>"
                }
                if(response.data['status_msg']==='NotOk'){
                    document.getElementById('registerMsg').innerText=response.data['msg']
                }
            }
        )
    }
    render() {
        return (
            <>
                <div style={{paddingTop : "20px",paddingLeft : "500px"}}>
                    <div className="container">
                        <p id="registerMsg" style={{color : "lightgreen",fontSize : "20px"}}>

                        </p>
                        <form method="POST" className="login-email" onSubmit={(e) =>this.handleSubmit(e)}>
                            <p className="login-text" style={{fontSize: "2rem",fontWeight: "800"}}>Register</p>
                            <div className="input-group">
                                <input type="text" placeholder="First Name" name="first_name" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Last Name" name="last_name" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Username" name="username" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" name="email" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" name="password" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Confirm Password" name="conformPassword" onChange={this.handleCheckPassword} required/>
                                <p id="passwordMsg" style={{color : "red"}}>

                                </p>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender"
                                   id="male" value="M" onChange={this.handleChange}/>
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender"
                                       id="female" value="F" onChange={this.handleChange} />
                                    <label className="form-check-label" htmlFor="female">
                                        Female
                                    </label>
                            </div>
                            <br/>
                            <div className="input-group">
                                <input type="tel" placeholder="Mobile Number" name="mobilenumber" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="submit" className="btn" value="Register"/>
                            </div>
                            <p className="login-register-text">Have an account?
                                <NavLink to="/login" activeStyle={{color : "red"}} style={{textDecoration : "none"}}>
                                Login
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default RegisterForm