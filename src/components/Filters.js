import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Submit button
// import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// Dropdown menu filter
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

//Grid
// import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  padBottom: {
    marginBottom: '5px'
  }
});

const ranges = [
    {
      value: 5,
      label: '< 5',
    },
    {
      value: 10,
      label: '< 10',
    },
    {
      value: 20,
      label: '< 20',
    },
    {
      value: 1000,
      label: 'Any',
    },
  ];

class Filters extends React.Component {
  state = {
    courtCost: 'all',
    courtDistance: '0-20'
  };

  handleChange = event => {
    this.setState({ courtCost: event.target.value }, () => {
      //console.log(this.state.costValue);
      this.props.updateFilters(this.state);

    });
    //this.props.updateFilters(this.state);
  };

  handleDistanceChange = prop => event => {
    this.setState({ [prop]: event.target.value }, () => {
      //console.log(this.state.courtDistance);
      this.props.updateFilters(this.state);
    });
  };

  applyFilters = () => {

    
    // get user location
    let noLocation = () => {
      console.log("No user location found.");
    }
    navigator.geolocation.getCurrentPosition((x) => {
      console.log(x);
    }, noLocation);
    
    let {courtCost, courtDistance, courts} = this.props;

    //console.log(courtCost);
    //console.log(courtDistance);
    //console.log(courts);

    let newCourtsList = [];

    newCourtsList = courts.filter(court => {
      return court.properties.freeAccess === true && courtCost === 'free';
    });

    console.log("Filtered list: ");
    console.log(newCourtsList);
    this.props.filterCourts(newCourtsList);

  }

  render() {
    const { classes } = this.props;
    //console.log(this.props);

    return (
          <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Court Cost</FormLabel>
            <RadioGroup
              aria-label="Court Cost"
              name="Court Cost"
              className={classes.group}
              value={this.props.courtCost}
              onChange={this.handleChange}
            >
              <FormControlLabel value="free" control={<Radio />} label="Free Courts" />
              <FormControlLabel value="premium" control={<Radio />} label="Premium Courts" />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
            <TextField
                select
                
                className={classes.padBottom}
                variant="outlined"
                label="Distance"
                value={this.props.courtDistance}
                onChange={this.handleDistanceChange('courtDistance')}
                InputProps={{
                startAdornment: <InputAdornment position="start">Miles</InputAdornment>,
                }}
            >
                {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" fullWidth onClick={this.applyFilters}>
                Apply Filters
            </Button>
          </FormControl>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      courtCost: state.formFilters.courtCost,
      courtDistance: state.formFilters.courtDistance,
      courts: state.courts.courts
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateFilters: (filterValues) => { dispatch({type: 'UPDATE_FILTERS', payload: filterValues}) },
      addCourts: (courts) => { dispatch({type: 'ADD_COURTS', courts: courts })},
      filterCourts: (filteredCourts) => {dispatch({type: 'FILTER_COURTS', payload: filteredCourts})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filters));
