import React, {useState, useEffect} from 'react'
// import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'

function Cart() {

    const [user, setUser] = useState('')
    const [loggedIn, setLoggedIn]  = useState(false)
    let bill;
    // const history = useHistory()
  
    useEffect(() => {
      axios.get("/users/authuser")
      .then(response => {
        setLoggedIn(true)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error)
        setLoggedIn(false)
      })
    }, [])


    if(user.cart){
      bill = user.cart.map((current, index) => {
        return(
          <tr key={index}>
          <td>{current.item.title}</td>
          <td>{current.item.MRP}</td>
          <td>{current.quantity}</td>
          <td>{current.item.MRP * current.quantity}</td>
          </tr>
        )}
        )
      }
 
    return (
        <div className="cart-page">
          <Navbar loggedIn={loggedIn} user={user} />
          <div className="cart">
            <h1>Your Basket</h1>
            <table className="cart-table">
                <tr>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            {bill}
            </table>
          </div>
        </div>
    )
}

export default Cart
