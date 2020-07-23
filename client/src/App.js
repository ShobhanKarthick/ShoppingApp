import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './Components/Styles.scss';
import Home from './Components/Home'
import Products from './Components/Products'
import About from './Components/About'
import Contact from './Components/Contact'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
    </Router>
  );
}

export default App;
