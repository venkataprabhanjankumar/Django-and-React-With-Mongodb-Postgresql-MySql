import React, {Component} from "react";
import csrfToken from "./csrf";
import axios from "axios";
import {NavLink,Redirect} from "react-router-dom";

class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            username : '',
            password : '',
            logged : false,
            redirect_url : ''
        }
    }
    handleChange=(event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value})
        event.stopPropagation()
    }
    handleSubmit=(event)=>{
        console.log(this.state)
        event.preventDefault()
        axios.post("https://127.0.0.1:8000/authenticate/login",{username:this.state.username,password : this.state.password},{
            withCredentials : true,
            headers : {
                'X-CSRFToken' : csrfToken('csrftoken')
            }
        }).then(
            response=>{
                console.log(response.data['login_status'])
                if(response.data['login_status']==='Ok'){
                    const re_url = "/dashboard/profile/"+response.data['authKey']
                    this.setState({logged : true,redirect_url: re_url})
                }
                if(response.data['login_status']==='Invalid'){
                    document.getElementById('registerMsg').innerText="Invalid Username or Password"
                }
            }
        )
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
    render() {
        return(
            <>
                {this.state.logged===false ?
                    <div className="signin">
                        <div className="container">
                            <p id="registerMsg" style={{color: "red", fontSize: "20px"}}>

                            </p>
                            <form method="POST" className="login-email" onSubmit={this.handleSubmit}>
                                <p className="login-text" style={{fontSize: "2rem", fontWeight: "800"}}>Login</p>
                                <div className="input-group">
                                    <input type="text" placeholder="Email or Username" name="username"
                                           onChange={this.handleChange} required/>
                                </div>
                                <div className="input-group">
                                    <input type="password" placeholder="Password" name="password"
                                           onChange={this.handleChange} required/>
                                </div>
                                <div className="input-group">
                                    <input type="submit" value="Login" className="btn"/>
                                </div>
                                <p className="login-register-text">Don't have an account?
                                    <NavLink to="/register" activeStyle={{color: "red"}}
                                             style={{textDecoration: "none"}}>
                                        Register
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                :<Redirect to={this.state.redirect_url}/>}
            </>
        )
    }
}
export default LoginForm