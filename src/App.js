import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import SidebarMUI from './components/SidebarMUI';
export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <SidebarMUI />
        </Router>
      </div>
    )
  }
}

export default App