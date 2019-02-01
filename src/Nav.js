import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Nav extends React.Component {
    state = {
        isOpen: true
    }
    /* handleClick = (e) => {
        console.log(this.state);
        this.setState({
            cakes: ['Jaffa cake']
        });
    } */


    render() {
        return (
            <React.Fragment>
                <AppBar position="static" color="primary" title="Find Courts">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Find Courts
                        </Typography>
                    </Toolbar>
                </AppBar>
               
            </React.Fragment>
            
        )
    }
}

export default Nav;