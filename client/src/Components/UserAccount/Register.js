import React, { useState } from 'react'
import Menubar from './Menubar'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConifrmPassword] = useState('')
    const [phone, setPhone] = useState('')

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const confirmPasswordHandler = (event) => {
        setConifrmPassword(event.target.value)
    }
    
    const phoneHandler = (event) => {
        setPhone(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        setName('')
        setEmail('')
        setPassword('')
        setConifrmPassword('')
        setPhone('')
    }

    return (
        <div className="register-login-page">
        <div className="register-login">
        <Menubar type="register" />
        <p className="register-login-head">Register</p>
        <form id="register-form" className="register-login-form" onSubmit={submitHandler}>
        <input className="register-login-input" type="text" value={name} onChange={nameHandler} placeholder="Name" />
        <input className="register-login-input" type="email" value={email} onChange={emailHandler} placeholder="E-mail" />
        <input className="register-login-input" type="password" value={password} onChange={passwordHandler} pattern=".{8,}" title="Your password must 8 or more characters" placeholder="Password" />
        <input className="register-login-input" type="password" value={confirmPassword} onChange={confirmPasswordHandler} title="Password do not match" placeholder="Confirm Password" />
        <input className="register-login-input" type="text" value={phone} onChange={phoneHandler} placeholder="Phone" />
        <button className="register-login-button"  form="register-form" type="submit">SIGN UP</button>
        </form>
        </div>
        </div>
    )
}

export default Register
