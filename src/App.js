import React, { Component } from 'react';
import Nav from './Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './Map';
import Court from './Court';
// import courtData from './tennis_courts.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCourtDetails: false
    }
  }
  
  componentWillMount() {
    // this.setState({courts: courtData});
    
  }

  render() {
    // console.log(this.state.props);
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          
          <Route
            exact path='/'
            render={(props) => <Map />}
          />
          <Route path='/court' component={Court} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
