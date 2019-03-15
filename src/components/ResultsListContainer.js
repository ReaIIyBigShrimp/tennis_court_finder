import React, { Component } from 'react';
import ResultsList from './ResultsList';

import {connect} from 'react-redux';

class ResultsListContainer extends Component {

  componentDidMount = () => {
    fetch('./tennis_courts.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        // Adds court data to state
        console.log(json);
        this.props.addCourts(json);
      })
      .catch(error => console.error(error));
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
