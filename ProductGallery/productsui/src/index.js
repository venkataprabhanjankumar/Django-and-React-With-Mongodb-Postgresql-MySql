import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './index.css';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import DashBoard from "./DashBoard";
import UserPanel from "./UserPanel";
import ProductDetails from "./productDetails";
//import Profile from "./Profile";

///import App from './App';
import reportWebVitals from './reportWebVitals';

const router1 = (
    <Router>
        <>
            <Switch>
                <Route exact path="/dashboard/profile/:token" component={UserPanel}/>
                <Route exact path="/dashboard/logout" component={UserPanel}/>
                <Route exact path="/dashboard/display-products/:token" component={UserPanel}/>
                <Route exact path="/dashboard/upload-products/:token" component={UserPanel}/>
                <Route exact path="/dashboard/shopping/:token" component={UserPanel}/>
                <Route exact path="/dashboard/change-password/:token" component={UserPanel}/>
                <Route exact path="/dashboard/shopping/:token" component={UserPanel}/>
                <Route exact path="/dashboard/shopping/:productId/:token" component={ProductDetails}/>
                <Route exact path="/dashboard/forget-password/:token" component={UserPanel}/>
                <Route exact path="/" component = {DashBoard}/>
                <Route exact path="/register" component={RegisterForm}/>
                <Route exact path="/login" component={LoginForm}/>
            </Switch>
        </>
    </Router>
)

ReactDOM.render(
  router1,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
