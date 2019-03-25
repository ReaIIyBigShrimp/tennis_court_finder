import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';
// import blueGrey from '@material-ui/core/colors/blueGrey';

import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';

const card = {
    minWidth: '350px',
    maxWidth: '400px',
    position: 'absolute',
    zIndex: 500,
    bottom: '25px',
    left: '1px'
}

const panelLink = {
    color: '#ffffff'
}

function DetailsOverlay(props) {
    const {courts} = props;
    const {panToCourtPosition} = props;
    console.log(courts.activeCourt);
    let courtSurfaces;
    let courtLatLon;
    let courtUrl;
    if (courts.activeCourt != null) {
        console.log(courts.activeCourt.properties.surfaces);
        courtSurfaces = courts.activeCourt.properties.surfaces[0];
        courtLatLon = courts.activeCourt.geometry.coordinates;
        courtUrl = 'http://maps.google.com/maps?daddr=' + courtLatLon[0] + ',' + courtLatLon[1] + '&amp;ll=';
    }

  return (
      <React.Fragment>
          <Card style={card}>
            <CardContent>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                justify="center"
                >
                    <Grid item>
                        <Typography variant="h4" color="textSecondary" gutterBottom>
                            {courts.activeCourt != null ? console.log(courts.activeCourt.properties.name) : console.log("Nothing")}
                            {courts.activeCourt != null ? courts.activeCourt.properties.name : 'Select a court'}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid
                container
                spacing={8}
                direction="row"
                alignItems="center"
                justify="flex-start"
                >
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom>
                            {courts.activeCourt != null ? "Number of courts: " + courts.activeCourt.properties.numOfCourts : ''}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom>
                            {courts.activeCourt != null ? "Surface(s): " + courtSurfaces : ''}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Typography color="textSecondary" gutterBottom>
                    {courts.activeCourt != null ? courts.activeCourt.properties.description : ''}
                </Typography>
            </CardContent>
            <CardActions>

                <Button variant="contained" color="primary" href={courtUrl} style={panelLink}>
                    <Typography variant="button" color="inherit">
                        Get Directions
                    </Typography>
                    <Icon>chevron_right</Icon>
                </Button>
                <Button variant="contained" color="secondary" onClick={panToCourtPosition}>
                    <Icon onClick={panToCourtPosition}>location_searching</Icon>
                </Button>
            </CardActions>
          </Card>
      </React.Fragment>
  )
}

const mapStateToProps = (state) => {
    return {
        courts: state.courts,
        activeCourt: state.activeCourt
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveCourt: (court) => { dispatch({type: 'SET_ACTIVE_COURT', court: court}) },
        addCourts: (courts) => { dispatch({type: 'ADD_COURTS', courts: courts })}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailsOverlay);

