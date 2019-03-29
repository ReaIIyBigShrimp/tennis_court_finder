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



class Favourites extends Component {

    removeFavourite = (id) => {
        let favourites = JSON.parse(localStorage.getItem('favouriteCourts'));

        let editedFavourites = favourites.filter((court) => {
            return (court.properties.id !== id)
        });
        localStorage.setItem('favouriteCourts',JSON.stringify(editedFavourites));
    }

  render() {

    let results;

    let favouriteCourts = JSON.parse(localStorage.getItem('favouriteCourts'));
    
    if (favouriteCourts != null) {
        results = favouriteCourts.map(favourite => {
            return (
                    <ListItem key={favourite.properties.id}>
                        
                        <ListItemText
                            primary={favourite.properties.name}
                            secondary={"No. of courts: " + favourite.properties.numOfCourts}
                        />
                        <ListItemSecondaryAction>
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
            <Typography variant="h6">
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

export default Favourites;