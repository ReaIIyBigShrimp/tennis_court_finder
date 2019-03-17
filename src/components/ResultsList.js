import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import {Link} from 'react-router-dom';

// Store
import {connect} from 'react-redux';

const styles = {
  card: {
    maxWidth: 345,
    margin: '0px 0px 10px 0px'
  },
  media: {
    height: 140,
  }
};

const ResultsList = (props) => {
  const { classes } = props;
  let courts = props.filteredCourts;
  // map over filteredCourts

  console.log(props);

  let courtsList;

  if(courts.length < 1) {
    courtsList = <Typography component="p">Select 'Apply Filters' to find your nearest tennis courts.</Typography>;
  } else {
    courtsList = courts.map(court => {
      console.log(props.setActiveCourt);
      return (
        <Grid item xs={12} sm={6} key={court.properties.id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={"./images/courts/"+ court.properties.id + ".jpg"}
                title="Court"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {court.properties.name}
                </Typography>
                <Typography gutterBottom component="p">
                  {court.distanceToUser.toFixed(1)} miles away
                </Typography>
                <Typography gutterBottom component="p">
                  {court.properties.description}
                </Typography>
                <Typography gutterBottom component="p">
                  Numbers of courts: {court.properties.numOfCourts}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" component={Link} to='/map' onClick={() => {props.setActiveCourt(court) } }>
                View on Map 
              </Button>
              <Button size="small" color="primary">
                Favourite
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    });
  }
  
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center" 
      >
      {courtsList}
    </Grid>
  );
}

ResultsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  //console.log(state.courts);
  //console.log(state.courts.courts);

    return {
        courts: state.courts,
        filteredCourts: state.courts.filteredCourts,
        activeCourt: state.courts.activeCourt
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveCourt: (court) => { dispatch({type: 'SET_ACTIVE_COURT', court: court}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultsList));