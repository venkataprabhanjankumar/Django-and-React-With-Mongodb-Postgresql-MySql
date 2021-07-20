import React, {Component} from "react";
import axios from "axios";
import './productDetails.css'
import Loader from "./loader";
class ProductDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            username : '',
            comment : '',
            loader : false
        }
    }
    componentDidMount() {
        this.setState({
            loader : true
        })
        console.log(window.location.pathname.split('/')[4])
        const authToken = window.location.pathname.split('/')[4]
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
                    })
                    console.log(window.location.pathname.split('/')[3])
                    axios.get('https://127.0.0.1:8000/products/get-product/?productId='+window.location.pathname.split('/')[3],{
                        withCredentials : true,
                        headers : {
                            Authorization: `Token ${authToken}`
                        }
                    }).then(
                        response=>{
                            console.log(response)
                            if(response.data['status']==='Ok'){
                                this.handleDisplay(response)
                            }
                        }
                    )
                }
            }
        )
    }
    handleDisplay=(response)=>{
        this.setState({
            loader : false
        })
        const productDiv = document.getElementById('productCard')
        const img = document.createElement('img')
        console.log(response.data['productImage'])
        const br = document.createElement('br')
        img.src="https://127.0.0.1:8000/products/"+response.data['productImage']
        img.alt="/"
        img.style.width="100%"
        const h3 = document.createElement('h3')
        const h3_txt = document.createTextNode(response.data['ProductName'])
        h3.appendChild(h3_txt)
        const p1 = document.createElement('p')
        p1.className="price"
        const p1_txt = document.createTextNode("Product Price    "+response.data['productPrice'])
        p1.appendChild(p1_txt)
        const button = document.createElement('button')
        const itag = document.createElement('i')
        itag.className="fa fa-heart"
        itag.id="heart"
        itag.style.fontSize="36px"
        itag.style.color="#d8e2f2"
        button.appendChild(itag)
        button.onclick=this.handleClick
        const comments = response.data['productComments']
        console.log(comments)
        const commentDiv = document.createElement('div')
        commentDiv.id="comment"
        for(let i=0;i<comments.length;i++){
            let cp = document.createElement('p')
            let txt = document.createTextNode(comments[i].commentBy+"    "+comments[i].comment)
            cp.appendChild(txt)

            commentDiv.appendChild(cp)
        }
        const inputDiv = document.createElement('div')
        const commentInput = document.createElement('input')
        commentInput.name="commentInput"
        commentInput.type="text"
        commentInput.placeholder="Add a Comment ...."
        commentInput.id="comment"
        commentInput.onchange=this.handleComment
        const submit = document.createElement('button')
        submit.type="submit"
        const submitContent = document.createTextNode("Submit Comment")
        submit.appendChild(submitContent)
        submit.onclick=this.handleCommentSubmit
        inputDiv.appendChild(commentInput)
        inputDiv.appendChild(submit)
        productDiv.appendChild(img)
        productDiv.appendChild(br)
        productDiv.appendChild(h3)
        productDiv.appendChild(br)
        productDiv.appendChild(p1)
        productDiv.appendChild(button)
        productDiv.appendChild(commentDiv)
        productDiv.appendChild(inputDiv)
    }
    handleClick=(event)=>{
        document.getElementById('heart').style.color="red";
        event.preventDefault()
    }
    handleComment=(event)=>{
        this.setState({
            comment : event.target.value
        })
        console.log(this.state.comment)
    }
    handleCommentSubmit=(event)=>{
        const authToken = window.location.pathname.split('/')[4]
        axios.post('https://127.0.0.1:8000/products/comments',{comment : this.state.comment,username:this.state.username,product_id:window.location.pathname.split('/')[3]},{
            withCredentials : true,
            headers : {
                Authorization: `Token ${authToken}`
            }
        }).then(
            response=>{
                console.log(response)
                if(response.data['status']==='Ok'){
                    alert("Successfully Posted the Comment ")
                }
            }
        )
    }
    render() {
        return(
            <>
                <div style={{paddingLeft : "550px",paddingTop : "50px"}}>
                    <div className="card" id="productCard">

                        <br/>
                        <br/>
                        {this.state.loader===true ? <><Loader> </Loader> Loading Product </> :null}
                    </div>
                </div>
            </>
        )
    }
}
export default ProductDetails