import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';


const rowStyle = {
    zIndex: 500,
    position: 'absolute',
    bottom: '0px'
}
const card = {
    minWidth: '400px',
    position: 'absolute',
    zIndex: 500,
    bottom: '20px',
    left: '5px'
}

function DetailsOverlay(props) {
    
    const {court, panToCourtPosition} = props;
    console.log(court);
    let courtSurfaces;
    if (court != null) {
        console.log(court.properties.surfaces);
        console.log();
        courtSurfaces = court.properties.surfaces[0];
    }

  return (
      <React.Fragment>
          <Card style={card}>
            <CardContent>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                    {court != null ? court.properties.name : 'Select a court'}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {court != null ? "Number of courts: " + court.properties.numOfCourts : ''}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {court != null ? "Surface(s): " + courtSurfaces : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">
                    <Typography variant="button" color="inherit">
                        View More Details
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

export default DetailsOverlay;

