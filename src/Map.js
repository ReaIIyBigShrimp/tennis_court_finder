import React from 'react';
import L from 'leaflet';
import DetailsOverlay from './DetailsOverlay';

class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            mapLoaded: false,
            activeCourt: null
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
        });
        // this.state.map = L.map('map').setView([53.645792, -1.785035], 13);
        /* L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(this.state.map); */

        
        navigator.geolocation.getCurrentPosition((x) => {
            console.log(x);
        }, noLocation);
        
        fetch('./tennis_courts.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({courts: json});
                this.addMarkers();
            })
            .catch(error => console.error(error));
      
    }



    addMarkers = () => {
        /* let courtMarkers = this.state.courts.map((x) => {return L.marker(x.geometry.coordinates)});
        let allCourtsGroup = L.layerGroup(courtMarkers); */

        this.state.courts.forEach(court => {
            let courtObj = {};
            courtObj = court;

            let marker = L.marker(court.geometry.coordinates).addTo(this.state.map);
            marker.addEventListener('click', (court) => {this.setState({activeCourt: courtObj})}, false);
        });
        // allCourtsGroup.addTo(this.map);
    }

    panToCourtPosition = () => {
        if (this.state.activeCourt != null) {
            this.state.map.setView(this.state.activeCourt.geometry.coordinates);
        }
    }

    handleClick = (e) => {
        this.state.activeCourt != null ? this.panToCourtPosition() : console.log("no court")  ;
    }

    render() {
        return (
                <div className="map-container">
                    <div id="map">
                        <DetailsOverlay panToCourtPosition={this.panToCourtPosition} court={this.state.activeCourt}/>
                    </div>
                </div>
        )
    }
}

export default Map;