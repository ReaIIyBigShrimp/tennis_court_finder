import React, { Component } from 'react';
import Filters from './Filters';
import Grid from '@material-ui/core/Grid';
import ResultsListContainer from './ResultsListContainer';

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
        <Grid item xs={12}>
          <ResultsListContainer/>
        </Grid>
      </Grid> 
    )
  }
}

export default Search;