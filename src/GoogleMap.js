import React, {Component} from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                style={{width: "500px", height: "500px"}}
                zoom={10}
                initialCenter={
                    {
                        lat: 45.90610101557426,
                        lng: 6.116306811445137
                    }
                }

            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE"
})(MapContainer)