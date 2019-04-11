import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  addToFavourites = (courtToAdd) => {
    let favouriteCourts = [];
    if(localStorage.getItem('favouriteCourts')){
      favouriteCourts = JSON.parse(localStorage.getItem('favouriteCourts'));
      console.log(localStorage.getItem('favouriteCourts'));
      // Remove old list
      //localStorage.removeItem('favouriteCourts');
    }
  
    favouriteCourts.push(courtToAdd);
  
    let deDupedFavourites = favouriteCourts.filter((elem, index, self) => self.findIndex(
      (courtX) => {return (courtX.properties.id === elem.properties.id && courtX.properties.id === elem.properties.id)}) === index)
  
    // Add updated favourite list
    localStorage.setItem('favouriteCourts', JSON.stringify(deDupedFavourites));
    console.log(localStorage.getItem('favouriteCourts'));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button size="small" color="primary" onClick={() => {this.addToFavourites(this.props.court); this.handleClick()}}>Favourite</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.court.properties.name} added to favourites!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);