import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Icon } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
    clearBtn: {
        position: 'absolute',
        right: '-30px'
    },
    titleFavourites: {
        marginTop: '10px'
    }
}

class Favourites extends Component {
    constructor(props){
        super(props);

        this.state = {
            favouriteCourts: JSON.parse(localStorage.getItem('favouriteCourts'))
        }
    }


    removeFavourite = (id) => {
        //let favourites = JSON.parse(localStorage.getItem('favouriteCourts'));
        let favourites = this.state.favouriteCourts;
        let editedFavourites = favourites.filter((court) => {
            return (court.properties.id !== id)
        });
        this.setState({favouriteCourts: editedFavourites});
        localStorage.setItem('favouriteCourts',JSON.stringify(editedFavourites));
    }

  render() {
    const { classes } = this.props;
    let results;

    //let favouriteCourts = JSON.parse(localStorage.getItem('favouriteCourts'));

    let favouriteCourts = this.state.favouriteCourts;
    
    if (favouriteCourts != null) {
        results = favouriteCourts.map(favourite => {
            return (
                    <ListItem key={favourite.properties.id}>
                        
                        <ListItemText
                            primary={favourite.properties.name}
                            secondary={"No. of courts: " + favourite.properties.numOfCourts}
                        />
                        <Button size="small" color="primary" component={Link} to='/map' onClick={() => {this.props.setActiveCourt(favourite) } }>
                            View on Map 
                        </Button>
                        <ListItemSecondaryAction className={classes.clearBtn}>
                            <IconButton aria-label="Delete" onClick={() => {this.removeFavourite(favourite.properties.id)}}>
                                <ListItemIcon><Icon>clear</Icon></ListItemIcon>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
            )
        })
    }
    

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
            <Typography variant="h6" className={classes.titleFavourites}>
              Favourites
            </Typography>
          </Grid>   
          <Grid item>
            <List>
                {results}
            </List>
          </Grid>
        </Grid> 
      </Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {
    return {
        courts: state.courts,
        filteredCourts: state.courts.filteredCourts,
        activeCourt: state.courts.activeCourt
    }
  }
  
  Favourites.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setActiveCourt: (court) => { dispatch({type: 'SET_ACTIVE_COURT', court: court}) }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Favourites));