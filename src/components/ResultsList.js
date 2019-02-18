import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Store
import {connect} from 'react-redux';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

const ResultsList = (props) => {
  const { classes } = props;
  
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://placeimg.com/640/480/any"
          title="Court"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            [Court title]
          </Typography>
          <Typography component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View on Map
        </Button>
        <Button size="small" color="primary">
          Favourite
        </Button>
      </CardActions>
    </Card>
  );
}

ResultsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultsList));