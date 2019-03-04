import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';
// import blueGrey from '@material-ui/core/colors/blueGrey';
import {connect} from 'react-redux';

const card = {
    minWidth: '400px',
    position: 'absolute',
    zIndex: 500,
    bottom: '20px',
    left: '5px'
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
                <Typography variant="h4" color="textSecondary" gutterBottom>
                    {courts.activeCourt != null ? console.log(courts.activeCourt.properties.name) : console.log("Nothing")}
                    {courts.activeCourt != null ? courts.activeCourt.properties.name : 'Select a court'}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                
                    {courts.activeCourt != null ? "Number of courts: " + courts.activeCourt.properties.numOfCourts : ''}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {courts.activeCourt != null ? "Surface(s): " + courtSurfaces : ''}
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

