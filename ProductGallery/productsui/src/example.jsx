import axios from "axios";
axios.defaults.xsrfHeaderName ="X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

// use for http for not secure

function sampleExample(){
    axios.get("http://127.0.0.1:8000/authenticate/get_csrf",{
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

export default sampleExample