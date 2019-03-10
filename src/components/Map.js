import React from 'react';
import L from 'leaflet';
import DetailsOverlay from './DetailsOverlay';
import {connect} from 'react-redux';

class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            test: null
        };
    }
    componentDidMount = () => {
        let noLocation = () => {
            console.log("No user location found.");
        }
        // TO CHANGE (get location)
        // Remove hard coded location for production
        this.setState({
            map: L.map('map').setView([53.645792, -1.785035], 13)
        }, () => {
            L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
                attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(this.state.map);
            if (this.props.activeCourt != null) {
                this.state.map.setView(this.props.activeCourt.geometry.coordinates);
            }
        });
        navigator.geolocation.getCurrentPosition((x) => {
            console.log(x);
        }, noLocation);

        
        
        // Fetch JSON court data
        fetch('./tennis_courts.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                // Adds court data to state
                this.setState({courts: json});

                this.addMarkers();
            })
            .catch(error => console.error(error));
    }

    addMarkers = () => {
        this.props.filteredCourts.forEach(court => {
            let courtObj = {};
            courtObj = court;

            let marker = L.marker(court.geometry.coordinates).addTo(this.state.map);
            marker.addEventListener('click', (court) => {this.props.setActiveCourt(courtObj)}, false);
        });
    }
    // Uses selected court's coordinates to pan to its marker on the map
    panToCourtPosition = () => {
        if (this.props.courts.activeCourt != null) {
            this.state.map.setView(this.props.courts.activeCourt.geometry.coordinates);
        }
    }
    render() {
        console.log(this.props);
        console.log(this.props.courts.activeCourt);
        return (
            <div className="map-container">
                <div id="map">
                    <DetailsOverlay panToCourtPosition={this.panToCourtPosition} court={this.state.activeCourt}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courts: state.courts.courts,
        activeCourt: state.courts.activeCourt,
        filteredCourts: state.courts.filteredCourts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveCourt: (court) => { dispatch({type: 'SET_ACTIVE_COURT', court: court}) },
        addCourts: (courts) => { dispatch({type: 'ADD_COURTS', courts: courts })}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);