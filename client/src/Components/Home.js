import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, AccountCircle, ShoppingCart } from '@material-ui/icons'

function Home() {

  const openMenu = () => {
    document.getElementById("bg-overlay").style.display = "block"
    document.getElementById("mobile-nav").style.display = "block"
    document.getElementById("mobile-nav").style.width = "75vw"

  }
  const closeMenu = () => {
    document.getElementById("bg-overlay").style.display = "none"
    document.getElementById("mobile-nav").style.display = "none"
  }

    return (
        <div className="home-page">
        <div onClick={closeMenu} id="bg-overlay" className="bg-overlay"/>
        <div id="mobile-nav" className="mobile-nav">
        <h1><Link to="/">Quickmart</Link></h1>
        <Link to="/"><div className="mobile-nav-items">Home</div></Link>
        <Link to="/products"><div className="mobile-nav-items">Products</div></Link>
        <Link to="/about"><div className="mobile-nav-items">About</div></Link>
        <Link to="/contact"><div className="mobile-nav-items">Contact</div></Link>
        </div>


          <div className="home-nav">
          <Menu onClick={openMenu} id="menu-icon"/>
            <h1>Quickmart</h1>
            <div className="home-items-container">
            <Link to="/" className="home-nav-items">Home</Link>
            <Link to="/products" className="home-nav-items">Products</Link>
            <Link to="/about" className="home-nav-items">About</Link>
            <Link to="/contact" className="home-nav-items">Contact</Link>
            <div className="home-nav-items"><AccountCircle /></div>
            <div className="home-nav-items"><ShoppingCart /></div>
            </div>
          </div>  
        </div>
    )
}

export default Home
