import './App.css';

//rcc shortcut for class based component
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  c = "John"
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
      </div>
    );
  }
}
