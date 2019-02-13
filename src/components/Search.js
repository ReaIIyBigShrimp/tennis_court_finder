import React, { Component } from 'react';
import Filters from './Filters';
import Grid from '@material-ui/core/Grid';

class Search extends Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} >
          <Filters />
        </Grid>   

      </Grid> 
    )
  }
}

export default Search;