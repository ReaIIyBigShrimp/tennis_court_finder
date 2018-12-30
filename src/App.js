import React, { Component } from 'react';
import Nav from './Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './Map';
import Court from './Court';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
            <Nav />
            <Route exact path='/' component={Map} />
            <Route path='/court' component={Court} />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
