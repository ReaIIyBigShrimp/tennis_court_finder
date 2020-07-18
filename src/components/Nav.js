import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SideNav from './SideNav';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontSize: '0.9em',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  sourceLink: {
    fontSize: '0.7em',
    opacity: 0.75,
  }
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideNav/>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Find Local Tennis Courts
          </Typography>
          <Button color="inherit" href="http://github.com/reaiiybigshrimp/tennis_court_finder" className={classes.sourceLink}>Source Code(GitHub)</Button>
        </Toolbar>
        
      </AppBar>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);