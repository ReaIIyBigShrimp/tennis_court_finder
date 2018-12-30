import React from 'react';
import L from 'leaflet';

class Map extends React.Component {
    // shouldComponentUpdate(){return false;}

    componentDidMount() {
        // var position;

        let noLocation = () => {
            console.log("No user location found.");
        }


        this.map = L.map('map').setView([-1.785035, 53.645792], 17);
        L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(this.map);

        
        navigator.geolocation.getCurrentPosition((x) => {
            console.log(x);
        }, noLocation);
        

        
    }
    render() {
        return (
            <div className="container">
                <h2>Map to be displayed here...</h2>
                <div id="map"></div>
            </div>
        )
    }
}

export default Map;