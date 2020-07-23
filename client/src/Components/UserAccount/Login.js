import React, { useState } from 'react'
import Menubar from './Menubar'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        setEmail('')
        setPassword('')
    }

    return (
        <div className="register-login-page">
        <div className="register-login">
        <Menubar type="login" />
        <p className="register-login-head">Log in to your account</p>
        <form id="login-form" className="register-login-form" onSubmit={submitHandler}>
        <input className="register-login-input" type="email" value={email} onChange={emailHandler} placeholder="E-mail" />
        <input className="register-login-input" type="password" value={password} onChange={passwordHandler} placeholder="Password" />
        <button className="register-login-button"  form="login-form" type="submit">LOGIN</button>
        </form>

        </div>
        </div>
    )
}

export default Login
