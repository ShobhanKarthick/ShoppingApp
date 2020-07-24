import React, { useState, useEffect } from 'react'
import Menubar from './Menubar'
import axios from 'axios'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConifrmPassword] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        document.getElementById("name").style.display = "none"
        document.getElementById("password").style.display = "none"
        document.getElementById("confirmPassword").style.display = "none"
        document.getElementById("phone").style.display = "none"
        document.getElementById("register-button").style.display = "none"
        return
    }, [])

    const emailCheck = () => {
        axios.post("/users/checkuser", {username: email})
        .then(response => {
            if(response.data.error === "Found"){
                alert("You have already registered")
            }
            if(response.data.error === "Not Found"){
                document.getElementById("name").style.display = "block"
                document.getElementById("password").style.display = "block"
                document.getElementById("confirmPassword").style.display = "block"
                document.getElementById("phone").style.display = "block"
                document.getElementById("next-button").style.display = "none"
                document.getElementById("register-button").style.display = "block"
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

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
        <input id="email" className="register-login-input" type="email" value={email} onChange={emailHandler} placeholder="E-mail" required/>
        <input id="name" className="register-login-input" type="text" value={name} onChange={nameHandler} placeholder="Name" required/>
        <input id="password" className="register-login-input" type="password" value={password} onChange={passwordHandler} pattern=".{8,}" title="Your password must 8 or more characters" placeholder="Password" required/>
        <input id="confirmPassword" className="register-login-input" type="password" value={confirmPassword} onChange={confirmPasswordHandler} pattern={password} title="Password do not match" placeholder="Confirm Password" required/>
        <input id="phone" className="register-login-input" type="text" value={phone} onChange={phoneHandler} pattern="[0-9]{10}" maxLength="10" placeholder="Phone" required/>
        <button id="next-button" className="register-login-button" onClick={emailCheck}>NEXT</button>
        <button id="register-button" className="register-login-button"  form="register-form" type="submit">SIGN UP</button>
        </form>
        </div>
        </div>
    )
}

export default Register
