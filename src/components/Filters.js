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
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// Dropdown menu filter
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

//Grid
import Grid from '@material-ui/core/Grid';

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
    costValue: 'all',
    courtDistance: '0-20'
  };

  handleChange = event => {
    this.setState({ costValue: event.target.value }, () => {console.log(this.state.costValue)});
  };

  handleDistanceChange = prop => event => {
    this.setState({ [prop]: event.target.value }, () => {console.log(this.state.courtDistance)});
  };

  render() {
    const { classes } = this.props;

    return (
      
        
          <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Court Cost</FormLabel>
            <RadioGroup
              aria-label="Court Cost"
              name="Court Cost"
              className={classes.group}
              value={this.state.costValue}
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
                value={this.state.courtDistance}
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
            <Button variant="contained" color="primary" fullWidth>
                Apply Filters
            </Button>
          </FormControl>
          
        </div>
        
      
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filters);
