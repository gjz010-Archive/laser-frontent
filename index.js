import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';
import Hello from './Hello';
import './style.css';
import Button from '@material-ui/core/Button';
import Dashboard from './dashboard/Dashboard';
import Api from "./api"
import { Provider } from 'react-redux'
import {store} from "./store"
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

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
