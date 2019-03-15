import React, { Component } from 'react';
import ResultsList from './ResultsList';

import {connect} from 'react-redux';

class ResultsListContainer extends Component {

  componentDidMount = () => {
    
  }

  render() {
    return (
      <ResultsList />
    )
  }
}

const mapStateToProps = (state) => {
  return {
      courts: state.courts,
      activeCourt: state.activeCourt,
      filteredCourts: state.courts.filteredCourts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setActiveCourt: (court) => { dispatch({type: 'SET_ACTIVE_COURT', court: court}) },
      addCourts: (courts) => { dispatch({type: 'ADD_COURTS', payload: courts })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsListContainer);
