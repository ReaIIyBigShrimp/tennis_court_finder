import React from 'react'

const style = {
    zIndex: 500,
    position: 'absolute',
    bottom: '0px'
}

function DetailsOverlay({court}) {
    console.log(court);
    court != null ? console.log(court.properties) : console.log('No court data');
  return (
    <div style={style} className="row">
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{court != null ? '{court.properties.name}' : 'No court selected'}</span>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                </div>
                <div className="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailsOverlay;

