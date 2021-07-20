import React,{Component} from 'react';
import './style1.css'
import Loader from "./loader";
import axios from "axios";
class ForgetPassword extends Component{
    constructor(props) {
        super(props);
        this.state={
            old_password : '',
            new_password : '',
            re_password : '',
            loader : false
        }
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handlePassword=(event)=>{
        if(this.state.new_password!==''){
            if(this.state.new_password!==event.target.value){
                document.getElementById('re-password').innerText="Re-enter Password Correctly"
            }
            else {
                document.getElementById('re-password').innerText=null
                this.setState({
                    re_password : event.target.value
                })
            }
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        if(this.state.new_password===this.state.re_password){
            this.setState({
                loader : true
            })
            const authToken = window.location.pathname.split('/')[3]
            axios.post('https://127.0.0.1:8000/authenticate/change-password',{'old_password':this.state.old_password,'new_password':this.state.new_password},{
                withCredentials : true,
                headers : {
                    Authorization: `Token ${authToken}`
                }
            }).then(
                response=>{
                    console.log(response)
                    this.setState({
                        loader : false
                    })
                    if(response.data['status']==='Ok'){
                        document.getElementById('failMsg').innerText=null
                        document.getElementById('successMsg').innerText="Password Updated"
                        document.getElementById('oldpassword').value=null;
                        document.getElementById('password').value=null;
                        document.getElementById('cpassword').value=null;
                    }
                    else {
                        document.getElementById('successMsg').innerText=null
                        document.getElementById('failMsg').innerText="Specify Correct Details"
                        document.getElementById('oldpassword').value=null;
                        document.getElementById('password').value=null;
                        document.getElementById('cpassword').value=null;
                    }
                }
            )
        }
        else {
            document.getElementById('re-password').innerText="Re-enter Password Correctly"
        }
    }
    render() {
        return(
            <>
                <div style={{paddingTop : "20px",paddingLeft : "300px"}}>
                    <div className="container">
                        <p id="successMsg" style={{color : "lightgreen",fontSize : "20px"}}>

                        </p>
                        <p id="failMsg" style={{color : "red",fontSize : "20px"}}>

                        </p>
                        <form method="POST" className="login-email" onSubmit={(e) =>this.handleSubmit(e)}>
                            <p className="login-text" style={{fontSize: "2rem",fontWeight: "800"}}>Change Password</p>
                            <div className="input-group">
                                <input type="password" placeholder="Enter Old Password" name="old_password" id="oldpassword" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Enter Password " name="new_password" id="password" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Re-Enter Password " name="re_password" id="cpassword" onChange={this.handlePassword} required/>
                                <p id="re-password" style={{color : "red",fontSize:"15px"}}> </p>
                            </div>
                            <div className="input-group">
                                <input type="submit" className="btn" value="Change Password"/>
                            </div>
                            {this.state.loader===true ? <><Loader> </Loader> Updating Password</> : null}
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default ForgetPassword