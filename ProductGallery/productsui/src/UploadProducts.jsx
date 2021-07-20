import React from 'react';
import './uploadStyle.css';
import axios from "axios";
import csrfToken from "./csrf";
import Loader from './loader'

class UploadProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            productName : '',
            productBy : this.props.username,
            productCount : '',
            productLikes : 0,
            productPrice : '',
            tempTag : '',
            tags : [],
            productImage : null,
            loading : false
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
    handleFile=(event)=>{
        console.log(event.target.files)
        this.setState({
            productImage : event.target.files[0]
        })
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state)
        let form_data = new FormData();
        form_data.append('productImage',this.state.productImage,this.state.productImage.name)
        form_data.append('productName',this.state.productName)
        form_data.append('productCount',this.state.productCount)
        form_data.append('productBy',this.state.productBy)
        form_data.append('tags',this.state.tags)
        form_data.append('productPrice',this.state.productPrice)
        form_data.append('productLikes',this.state.productLikes)
        this.setState({tempTag :''})
        this.setState({loader : true})
        axios.post('https://127.0.0.1:8000/products/upload-products',form_data,{
            withCredentials : true,
            headers : {
                Authorization: `Token ${window.location.pathname.split('/')[3]}`,
                'content-type': 'multipart/form-data',
                'X-CSRFToken':csrfToken('csrftoken')
            }
        }).then(
            response =>{
                this.setState({loader : false})
                console.log(response)
                if(response.data['status']==='Ok'){
                    document.getElementById('uploadMsg').innerHTML="" +
                        "<p>Product Uploaded Sucessfully</p>"
                    document.getElementById('ProductName').value=null
                    document.getElementById('ProductCount').value=null
                    document.getElementById('ProductPrice').value=null
                    this.setState({tags:[]})
                    this.handleDisplayTags()
                }
                else {
                    document.getElementById('uploadMsg').innerHTML="" +
                        "<p>Some Error Occured</p>"
                }
            }
        )
    }
    handleClose=(event)=>{
        console.log("Hello")
        console.log(event.target.id)
        console.log(this.state.tags.length)
        for (let i=0;i<this.state.tags.length;i++){
            if(event.target.id===this.state.tags[i]){
                this.state.tags.splice(i,1)
                break
            }
        }
        this.handleDisplayTags()
    }
    handleDisplayTags=()=>{
        document.getElementById('tagsDisplay').innerHTML=null;
        if(this.state.tags.length !==0){
            for(let i=0;i<this.state.tags.length;i++){
                let li = document.createElement("li");
                li.className="tagsLi"
                let text = document.createTextNode(this.state.tags[i]+"              ")
                li.appendChild(text)
                document.getElementById('tagsDisplay').appendChild(li)
                let span = document.createElement("span")
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.id=this.state.tags[i]
                span.appendChild(txt);
                span.onclick=this.handleClose
                li.appendChild(span);
            }
        }
    }
    handleTag =(event)=>{
        this.setState({tempTag : event.target.value})
        event.stopPropagation()
    }
    handleTags=(event)=>{
        this.state.tags.push(this.state.tempTag)
        this.handleDisplayTags()
        document.getElementById('productTags').value=""
        event.preventDefault()
    }
    render() {
        return(
            <>
                <div style={{paddingTop : "20px",paddingLeft : "300px"}}>
                    <div className="container">
                        <p id="uploadMsg" style={{color : "lightgreen",fontSize : "20px"}}>

                        </p>
                        <form method="POST" className="login-email" onSubmit={(e) =>this.handleSubmit(e)}>
                            <p className="login-text" style={{fontSize: "2rem",fontWeight: "800"}}>Upload Products</p>
                            <div className="input-group">
                                <input type="text" placeholder="Product Name" name="productName" id="ProductName" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="number" placeholder="Product Price" name="productPrice" id="ProductPrice" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group">
                                <input type="number" placeholder="Product Count" name="productCount" id="ProductCount" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-group" style={{display : 'flex',flexDirection : 'row'}}>
                                <input type="text" placeholder="Product Tags" name="tags" id="productTags" onChange={this.handleTag}/>
                                <button className="btn btn-primary" name="addTags" onClick={this.handleTags}><i className="fa fa-plus" aria-hidden="true"> </i> Add Tags</button>
                            </div>
                             <div style={{display : 'flex',flexDirection : 'row',listStyle : 'none'}} id="tagsDisplay">

                            </div>
                            <br/>
                            <input type="file" name="productImage" id="upload" accept="image/*" onChange={this.handleFile} />
                            <br/>
                            <br/>
                            <div className="input-group">
                                <input type="submit" className="btn" value="Upload"/>
                            </div>
                            {this.state.loader===true ? <><Loader> </Loader> Uploading Product </> : null}
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default UploadProducts