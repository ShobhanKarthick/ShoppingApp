import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, AccountCircle, ShoppingCart } from '@material-ui/icons'
import axios from 'axios'

function Navbar(props) {

    const history = useHistory()

    const openMenu = () => {
        document.getElementById("bg-overlay").style.display = "block"
        document.getElementById("mobile-nav").style.display = "block"
        document.getElementById("mobile-nav").style.width = "75vw"
    
      }
      const closeMenu = () => {
        document.getElementById("bg-overlay").style.display = "none"
        document.getElementById("mobile-nav").style.display = "none"
      }

      const account = () => {
        if(props.loggedIn){
          document.getElementById("logout-dialog").style.display = "flex"
          document.getElementById("bg-logout-overlay").style.display = "block"
        }
        else{
          history.push("/login")
        }
      }

      const closeLogout = () => {
        document.getElementById("logout-dialog").style.display = "none"
        document.getElementById("bg-logout-overlay").style.display = "none"
      }

      const logout = () => {
        localStorage.removeItem("TOKEN")
        axios.get("/users/logout")
        .then(() => {
          console.log("Logged Out")
          history.push("/")
        })
        .catch(error => console.log(error))
      }

    return (
        <React.Fragment>
        <div id="bg-logout-overlay" className="bg-overlay" onClick={closeLogout} />
        <div onClick={closeMenu} id="bg-overlay" className="bg-overlay"/>
        <div id="mobile-nav" className="mobile-nav">
        <h1><Link to="/">Easy Shoppie</Link></h1>
        <Link to="/"><div className="mobile-nav-items">Home</div></Link>
        <Link to="/products"><div className="mobile-nav-items">Products</div></Link>
        <Link to="/about"><div className="mobile-nav-items">About</div></Link>
        <Link to="/contact"><div className="mobile-nav-items">Contact</div></Link>
        </div>


          <div className="home-nav">
          <Menu onClick={openMenu} id="menu-icon"/>
            <h1><Link to="/">Easy Shoppie</Link></h1>
            <div className="home-items-container">
            <Link to="/" className="home-nav-items">Home</Link>
            <Link to="/products" className="home-nav-items">Products</Link>
            <Link to="/about" className="home-nav-items">About</Link>
            <Link to="/contact" className="home-nav-items">Contact</Link>
            <div className="home-nav-items"><AccountCircle onClick={account}/></div>
            <div className="home-nav-items"><Link to="/cart"><ShoppingCart /></Link></div>
            </div>
            <div id="logout-dialog" className="logout-dialog">
              <h2>Hello, {props.user.name}</h2>
              <button onClick={logout} className="logout-button">LOGOUT</button>
            </div>
          </div> 
        </React.Fragment>
    )
}

export default Navbar
