import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
            <nav className="nav-wrapper green darken-1">
                <div className="container nav-wrapper">
                    <a className="brand-logo">Tennis Court Finder</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/">Map</Link></li>
                        <li><Link to="/court">Court</Link></li>
                        <li><Link to="/">Map</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav;