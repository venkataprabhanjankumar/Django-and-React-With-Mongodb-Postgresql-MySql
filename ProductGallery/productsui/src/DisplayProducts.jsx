import React from 'react'
import Loader from "./loader";
import axios from "axios";
class DisplayProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loader : false
        }
    }
    componentDidMount() {
        this.setState({loader : true})
        axios.get('https://127.0.0.1:8000/products/display-products',{
            withCredentials : true,
            headers : {
                Authorization: `Token ${window.location.pathname.split('/')[3]}`,
            }
        }).then(
            response=>{
                this.setState({loader : false})
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
                        details.href="#"
                        const txt = document.createTextNode("Edit or View Product Details")
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
                <div id="wrap">
                    <div id="columns" className="columns_4">
                        {this.state.loader===true ? <><Loader> </Loader> Getting Product Please Wait </> : null}
                    </div>
                </div>
            </>
        )
    }
}
export default DisplayProducts