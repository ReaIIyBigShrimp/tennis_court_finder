import React, { Component, Fragment } from 'react';
import Filters from './Filters';
import Grid from '@material-ui/core/Grid';
import ResultsListContainer from './ResultsListContainer';

class Search extends Component {
  render() {
    return (
      <Fragment>
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
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center" 
        >
          <ResultsListContainer/>
        </Grid>
      </Fragment>
      
    )
  }
}

export default Search;