import React, { useState } from 'react'
import Menubar from './Menubar'
import axios from 'axios'

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

        const newUser  = {
            name,
            email,
            phone,
            password
        }
        axios.post("/users/register", newUser)
        .then(
            newUser => {
                console.log("User added")
            }
        )
        .catch(err => {
            console.log("User was not added")
        })

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
        <input className="register-login-input" type="text" value={name} onChange={nameHandler} placeholder="Name" required/>
        <input className="register-login-input" type="email" value={email} onChange={emailHandler} placeholder="E-mail" required/>
        <input className="register-login-input" type="password" value={password} onChange={passwordHandler} pattern=".{8,}" title="Your password must 8 or more characters" placeholder="Password" required/>
        <input className="register-login-input" type="password" value={confirmPassword} onChange={confirmPasswordHandler} pattern={password} title="Password do not match" placeholder="Confirm Password" required/>
        <input className="register-login-input" type="text" value={phone} onChange={phoneHandler} pattern="[0-9]{10}" maxLength="10" placeholder="Phone" required/>
        <button className="register-login-button"  form="register-form" type="submit">SIGN UP</button>
        </form>
        </div>
        </div>
    )
}

export default Register
