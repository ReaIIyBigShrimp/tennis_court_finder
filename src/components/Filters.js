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
      value: 50,
      label: '< 50'
    },
    {
      value: 1000,
      label: 'Any',
    },
  ];

class Filters extends React.Component {
  state = {
    courtCost: 'free',
    courtDistance: 1000
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

  // Formula for calculating the distance between two points
  // https://www.geodatasource.com/developers/javascript
  calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  applyFilters = () => {
    let {courtCost, courtDistance, courts} = this.props;
    
    // Logs if no location is found
    let noLocation = () => {
      console.log("No user location found.");
      alert("Error: No location found");
    }

    // Finds location then checks form filters for matching courts
    navigator.geolocation.getCurrentPosition((x) => {
      // Send location to Redux store via action
      // action takes position object
      this.props.setUserLocation(x);
      console.log(x);
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
        
        let newCourtsList = [];

        newCourtsList = json.filter(court => {
          let isMatch = false;
          if (court.properties.freeAccess === true && courtCost === 'free') {
            isMatch = true;
          }
          if (court.properties.freeAccess ===  false && courtCost === 'premium') {
            isMatch = true;
          }
          if (court.properties.freeAccess ===  true && courtCost === 'all') {
            isMatch = true;
          }
          
          return isMatch === true;
        });

        newCourtsList.map(court => {
          console.log(x.coords.latitude);
          console.log(x.coords.longitude);          
          console.log(court.distanceToUser = this.calculateDistance(
            x.coords.latitude,
            x.coords.longitude,
            court.geometry.coordinates[0],
            court.geometry.coordinates[1]
            ));

          return court
        });

        newCourtsList = newCourtsList.filter(court => {
          let withinRange = false;

          if(court.distanceToUser <= courtDistance){
            withinRange = true;
          }

          return withinRange === true;
        });
        // Sort courts with nearest first
        newCourtsList.sort((courtA, courtB) => parseFloat(courtA.distanceToUser) - parseFloat(courtB.distanceToUser));
        
        console.log("Filtered list: ");
        console.log(newCourtsList);
        this.props.filterCourts(newCourtsList);
      })
      .catch(error => console.error(error));
    }, noLocation);
    
    

    //console.log(courtCost);
    //console.log(courtDistance);
    //console.log(courts);

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
      filterCourts: (filteredCourts) => {dispatch({type: 'FILTER_COURTS', payload: filteredCourts})},
      setUserLocation: (location) => {dispatch({type: 'SET_USER_LOCATION', payload: location})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filters));
