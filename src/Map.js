import React from 'react';
import L from 'leaflet';

class Map extends React.Component {
    componentDidMount = () => {
        // var position;
        console.log(this.props);
        console.log(this.state);
        console.log(this.props.courts);
        
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

        // console.log(this.map);
        
        fetch('./tennis_courts.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => this.setState({courts: json}))
            .catch(error => console.error(error));       
        // get JSON data
        // loop over JSON data
        // get each court from data
        // add marker for each court
    }

    addMarkers = () => {
        console.log(this.map);
    }

    handleClick = (e) => {
        console.log(e.target.value);
        let newVal = parseInt(e.target.value);
        e.target.value = (newVal += 1);
        
        console.log(this.state);
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <div className="container">
                <h2>Map to be displayed here...</h2>
                <div className="map-container">
                    <div id="map"></div>
                    
                </div>
                <button value={0} onClick={this.addMarkers}>Click</button>
                <p>Props: {this.props.courts}</p>
            </div>
        )
    }
}

export default Map;