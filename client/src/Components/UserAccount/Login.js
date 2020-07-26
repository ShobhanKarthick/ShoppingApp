import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Menubar from './Menubar'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        document.getElementById("password").style.display = "none"
        document.getElementById("login-button").style.display = "none"
        return
    }, [])

    const emailCheck = () => {
        axios.post("/users/checkuser", {username: username})
        .then(response => {
            if(response.data.error === "Not Found"){
                alert("Please register yourself")
            }
            if(response.data.error === "Found"){
                document.getElementById("password").style.display = "block"
                document.getElementById("login-button").style.display = "block"
                document.getElementById("next-button").style.display = "none"
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        let loginDetails = {
            username: username,
            password: password
        }

        axios.post("/users/authenticate", loginDetails)
        .then(response => {
            localStorage.setItem(response.data.token, "TOKEN")
            history.push("/")
        })
        .catch(error => {
            console.log(error)
        })

        setUsername('')
        setPassword('')
    }

    return (
        <div className="register-login-page">
        <div className="register-login">
        <Menubar type="login" />
        <p className="register-login-head">Log in to your account</p>
        <form id="login-form" className="register-login-form" onSubmit={submitHandler}>
        <input id="email" className="register-login-input" type="text" value={username} onChange={usernameHandler} placeholder="E-mail / Phone" required />
        <input id="password" className="register-login-input" type="password" value={password} onChange={passwordHandler} placeholder="Password" required />
        <button id="next-button" className="register-login-button" onClick={emailCheck}>NEXT</button>
        <button id="login-button" className="register-login-button" form="login-form" type="submit">LOGIN</button>
        </form>

        </div>
        </div>
    )
}

export default Login
