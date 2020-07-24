import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './Components/Styles.scss';
import Home from './Components/Home'
import Products from './Components/Products'
import About from './Components/About'
import Contact from './Components/Contact'
import Register from './Components/UserAccount/Register';
import Login from './Components/UserAccount/Login';
import Cart from './Components/Cart/Cart';
import Verification from './Components/UserAccount/Verification';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/verification/:id/:code" component={Verification} />
    </Router>
  );
}

export default App;
