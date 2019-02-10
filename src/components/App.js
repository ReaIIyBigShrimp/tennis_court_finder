import React, { Component } from 'react';
import Nav from './Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './Map';
import Court from './Court';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#006064' },
    secondary: { main: '#43a047' },
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCourtDetails: false,

    }
  }

  
  
  componentWillMount() {
    
    
  }

  render() {
    
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Nav />
            
            <Route
              exact path='/'
              render={(props) => <Map />}
            />
            <Route path='/court' component={Court} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;