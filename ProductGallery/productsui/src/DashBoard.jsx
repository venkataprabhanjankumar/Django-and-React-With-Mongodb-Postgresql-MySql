import React, {Component} from "react";
import './style.css'
import logo from './products.png'
import {NavLink} from "react-router-dom";
class DashBoard extends Component{
    render() {
        return(
            <>
                <div style={{paddingLeft : "700px"}}>
                    <section id="main">
                        <nav>
                            <ul className="menu">
                                <li><NavLink to="/register">Signup</NavLink></li>
                                <li><NavLink to="/login">Sign In</NavLink></li>
                            </ul>
                        </nav>
                        <div>
                            <div className="content">
                                <div className="model">
                                    <img src={logo} alt="Logo" width="400px" height="400px" />
                                </div>
                                <div className="main-text">
                                    <h1>Shop Now</h1>
                                    <h2>Exiting Offers for Shopping</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}

export default DashBoard