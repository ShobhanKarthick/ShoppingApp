import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import HomeProducts from './HomeProducts'
import axios from 'axios'

function Home(props) {

  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn]  = useState(false)

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

    return (
        <div className="home-page">
          <Navbar loggedIn={loggedIn} user={user} />
          <HomeProducts loggedIn={loggedIn} user={user}/>
        </div>
    )
}

export default Home
