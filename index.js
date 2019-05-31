import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';
import Hello from './Hello';
import './style.css';
import Button from '@material-ui/core/Button';
import Dashboard from './dashboard/Dashboard';
import Api from "./api"
class App extends Component {
  constructor() {
    super();
    Api.then(console.log);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Dashboard/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
