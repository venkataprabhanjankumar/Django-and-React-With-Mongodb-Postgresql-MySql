import React, {Component} from "react";
import logo from './male.png'
import logo1 from './female.png'
import './profileStyle.css'
class Profile extends Component{
    render() {
        return(
            <>
                <div style={{paddingBottom : "600px"}}>
                <div className="content">
                    <div className="model">
                        {this.props.gender==='M' ? <img src={logo} alt=""/>:
                        <img src={logo1} alt="/"/>}
                    </div>
                    <div className="main-text">
                        <p>
                            First Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                {this.props.first_name}
                            </span>
                        </p>
                        <br/>
                        <p>
                            Last Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                {this.props.last_name}
                            </span>
                        </p>
                        <br/>
                        <p>
                            UserName:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                {this.props.username}
                            </span>
                        </p>
                        <br/>
                        <p>
                            Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                {this.props.email}
                            </span>
                        </p>
                        <br/>
                        <p>
                            Mobile Number :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                {this.props.mobileNumber}
                            </span>
                        </p>
                    </div>
                 </div>
                </div>
            </>
        )
    }
}
export default Profile