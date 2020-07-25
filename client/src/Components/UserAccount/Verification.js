import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Verification(props) {

    useEffect(() => {
        let identity = {
            id: props.match.params.id,
            code: props.match.params.code
        }
        axios.post("/users/emailverify", identity)
        .then(response => {
            if(response.data.error === "Already Verified"){
                document.getElementById("verification-head").innerHTML = "Your account has already been verifed"
            }
            if(response.data.error === "Incorrect verification code" || response.data.error === "User not found"){
                document.getElementById("verification-login-button").style.display = "none"
                document.getElementById("verification-sub-head").style.display = "none"
                document.getElementById("verification-head").innerHTML = "Check your mail and click on the valid link"
            }
        })
        .catch(error => {
            console.log(error)
        })
    })

    return (
        <div className="verification-page">
            <div className="verification-message-container"> 
            <h1 id="verification-head" style={{color: "#4ca541"}}>Your account has been verified</h1>
            <p id="verification-sub-head">Please click the button below to login</p>
            <Link id="verification-login-button" className="verification-login-button" to="/login">LOGIN</Link>
            </div>
        </div>
    )
}

export default Verification
