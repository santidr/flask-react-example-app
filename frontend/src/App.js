import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sites from './components/Sites'
import About from './components/About'

function App() {
  return (
    <Router>
        <Navbar />
        <div className="container p-4">
          <Switch>
            <Route path="/about" component={About}></Route>
            <Route path="/" component={Sites}></Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;