import React, { useEffect } from 'react'
import axios from 'axios'

function Verification(props) {

    useEffect(() => {
        let identity = {
            id: props.match.params.id,
            code: props.match.params.code
        }
        axios.post("/users/emailverify", identity)
        .then(response => {
            console.log(response.data.error)
        })
        .catch(error => {
            console.log(error)
        })
    })

    return (
        <div>
            <h1>Your account has been verified</h1>
        </div>
    )
}

export default Verification
