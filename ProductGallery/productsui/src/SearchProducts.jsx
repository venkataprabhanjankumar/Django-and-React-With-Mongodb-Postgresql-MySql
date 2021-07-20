import React, {Component} from "react";
import './productsDisplay.css'
import axios from "axios";
import Loader from './loader'
class SearchProducts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tagName : '',
            loader : false,
        }
    }
    handleChange=(event)=>{
        this.setState({
            tagName : event.target.value
        })
        console.log(this.props)
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        document.getElementById('columns').innerHTML=null
        this.setState({loader:true})
        axios.get('https://127.0.0.1:8000/products/searchProducts/?tagName='+this.state.tagName,{
            withCredentials : true,
            headers : {
                Authorization: `Token ${window.location.pathname.split('/')[3]}`,
            }
        }).then(
            response=>{
                console.log(response)
                this.setState({loader:false})
                if(response.data['status']==='Ok'){
                    const products = response.data['productList']
                    for(let i=0;i<products.length;i++){
                        console.log(products[i])
                        const figure = document.createElement('figure')
                        const img = document.createElement('img')
                        img.src="https://127.0.0.1:8000/products/"+products[i].productImage
                        img.alt="/"
                        figure.appendChild(img);
                        const figcaption = document.createElement('figcaption')
                        const productName = document.createTextNode(products[i].productName)
                        figcaption.appendChild(productName)
                        figure.appendChild(figcaption)
                        const span = document.createElement('span')
                        span.className="price"
                        const price = document.createTextNode(products[i].productPrice)
                        span.appendChild(price)
                        figure.appendChild(span)
                        const details = document.createElement('a')
                        details.className="button"
                        details.target="_blank"
                        details.href="/dashboard/shopping/"+products[i].productId+"/"+window.location.pathname.split('/')[3]
                        const txt = document.createTextNode("See Details")
                        details.appendChild(txt)
                        figure.appendChild(details)
                        document.getElementById('columns').appendChild(figure)
                    }
                }
            }
        )

    }
    render() {
        return(
            <>
                <div style={{paddingLeft : "300px",paddingTop : "20px",width : "100%"}}>
                    <form className="search-bar" method="GET">
                        <input type="text" id="search" onChange={this.handleChange} placeholder="Search Products .." name="tagName"/>
                        <button type="submit" onClick={this.handleSubmit}><i className="fa fa-search"> </i></button>
                    </form>
                </div>

                <div id="wrap">
                    <div id="columns" className="columns_4">
                        {this.state.loader===true ? <><Loader> </Loader> Getting Product Please Wait </> : null}
                    </div>
                </div>
            </>
        )
    }
}
export default SearchProducts