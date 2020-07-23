import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Menubar from './Menubar'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.getElementById("password").style.display = "none"
        document.getElementById("login-button").style.display = "none"
    })

    const emailVerify = () => {
        axios.post("/users/checkuser", username)
        .then(response => {
            console.log(response.data.error)
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

        setUsername('')
        setPassword('')
    }

    return (
        <div className="register-login-page">
        <div className="register-login">
        <Menubar type="login" />
        <p className="register-login-head">Log in to your account</p>
        <form id="login-form" className="register-login-form" onSubmit={submitHandler}>
        <input id="email" className="register-login-input" type="text" value={username} onChange={usernameHandler} placeholder="E-mail / Phone" />
        <input id="password" className="register-login-input" type="password" value={password} onChange={passwordHandler} placeholder="Password" />
        <button id="next-button" className="register-login-button" onClick={emailVerify}>NEXT</button>
        <button id="login-button" className="register-login-button" form="login-form" type="submit">LOGIN</button>
        </form>

        </div>
        </div>
    )
}

export default Login
