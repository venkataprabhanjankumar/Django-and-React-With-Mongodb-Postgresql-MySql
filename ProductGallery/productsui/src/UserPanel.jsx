import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import './pannel.css'
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Profile from "./Profile";
import DisplayProducts from "./DisplayProducts";
import UploadProducts from "./UploadProducts";
import axios from "axios";
import SearchProducts from "./SearchProducts";
import ForgetPassword from "./ForgetPassword";
class UserPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email : '',
            first_name : '',
            last_name : '',
            gender : '',
            mobileNumber : '',
            profile_url : '/dashboard/profile/'+window.location.pathname.split('/')[3],
            uploadProducts_url : '/dashboard/upload-products/'+window.location.pathname.split('/')[3],
            displayProducts_url : '/dashboard/display-products/'+window.location.pathname.split('/')[3],
            shopping_url : '/dashboard/shopping/'+window.location.pathname.split('/')[3],
            forget_url : '/dashboard/forget-password/'+window.location.pathname.split('/')[3],
            logout_url : '/dashboard/logout/'+window.location.pathname.split('/')[3]
        }
    }
    componentDidMount() {
        console.log(window.location.pathname.split('/')[3])
        const authToken = window.location.pathname.split('/')[3]
        axios.get('https://127.0.0.1:8000/authenticate/check',{
            withCredentials : true,
            headers : {
                Authorization: `Token ${authToken}`
            }
        }).then(
            response =>{
                console.log(response.data)
                if(response.data['status']==='Ok'){
                    this.setState({
                        username : response.data['username'],
                        email : response.data['email'],
                        first_name : response.data['first_name'],
                        last_name : response.data['last_name'],
                        gender : response.data['gender'],
                        mobileNumber : response.data['mobileNumber']
                    })
                }
            }
        )
    }
    handleLogout=(event)=>{
        console.log("Log out")
        const authToken = window.location.pathname.split('/')[3]
        axios.get('https://127.0.0.1:8000/authenticate/logout',{
            withCredentials : true,
            headers : {
                Authorization: `Token ${authToken}`
            }
        }).then(
            response=>{
                console.log(response)
                if(response.data['status']==='Ok'){
                    window.location.href="https://127.0.0.1:8080/"
                }
            }
        )
    }
    render() {
        return (
            <>
                <div className="container-main">
                    <div className="app">
                        <aside className="sidebar">
                            <ul className="sidebar-list">
                                <li className="sidebar-item">
                                    <NavLink activeClassName="active" exact to={this.state.profile_url}>
                                        Profile
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink exact to={this.state.uploadProducts_url} activeClassName="active">
                                        Upload Products
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink exact to={this.state.displayProducts_url} activeClassName="active">
                                        Display Products
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink exact to={this.state.shopping_url} activeClassName="active">
                                        Shopping
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink exact to={this.state.forget_url} activeClassName="active">
                                        Change Password
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink exact to={this.state.logout_url} activeClassName="active" onClick={this.handleLogout}>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </aside>
                        <main className="main">
                            <header className="header">
                                <div>
                                    <h1 className="header-title">Welcome Back, <strong>{this.state.username}</strong></h1>
                                    <div className="currently-viewing">
                                        <Switch>
                                            <Route exact path={this.state.profile_url} component={
                                                ()=><Profile username={this.state.username} email={this.state.email} first_name={this.state.first_name} last_name={this.state.last_name} gender={this.state.gender} mobileNumber={this.state.mobileNumber}/>
                                            }/>
                                            <Route exact path={this.state.uploadProducts_url} component={
                                                ()=><UploadProducts username={this.state.username}/>
                                            }/>
                                            <Route exact path={this.state.displayProducts_url} component={DisplayProducts}/>
                                            <Route exact path={this.state.shopping_url} component={SearchProducts}/>
                                            <Route exact path={this.state.forget_url} component={ForgetPassword}/>
                                        </Switch>
                                    </div>
                                </div>
                            </header>
                        </main>
                    </div>
                </div>
            </>
        )
    }
}
export default UserPanel