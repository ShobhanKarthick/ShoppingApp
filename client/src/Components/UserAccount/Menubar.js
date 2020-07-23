import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";

function Menubar(props) {
  useEffect(() => {
    switch (props.type) {
      case "login": {
        document.getElementById("account-login").style.color = "#4ca541";
        document.getElementById("account-login").style.borderColor = "#4ca541";
        document.getElementById("account-login").style.borderBottomWidth =
          "2px";
        document.getElementById("account-login").style.borderStyle = "solid";
        break;
      }
      case "register": {
        document.getElementById("account-register").style.color = "#4ca541";
        document.getElementById("account-register").style.borderColor =
          "#4ca541";
        document.getElementById("account-register").style.borderBottomWidth =
          "2px";
        document.getElementById("account-register").style.borderStyle = "solid";
        break;
      }
      default: {
        document.getElementById("account-login").style.color = "#4ca541";
        document.getElementById("account-login").style.borderColor = "#4ca541";
        document.getElementById("account-login").style.borderBottomWidth =
          "2px";
        document.getElementById("account-login").style.borderStyle = "solid";
        break;
      }
    }
  });

  return (
    <div className='account-menubar'>
      <Link className='account-menubar-items' id='account-login' to='/login'>LOGIN</Link>
      <Link to='/register' id='account-register' className='account-menubar-items'>SIGN UP</Link>
      <Link to='/' id='account-menubar-close' className='account-menubar-items'><Close /></Link>
    </div>
  );
}

export default Menubar;
