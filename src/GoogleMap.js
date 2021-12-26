import React, {Component} from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 45.90610101557426,
            longitude: 5.116306811445137,
        };
    }

    componentDidMount() {
        navigator.geolocation.watchPosition((position)=>{
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                style={{width: "500px", height: "500px"}}
                zoom={10}
                center={
                    {
                        lat: this.state.latitude,
                        lng: this.state.longitude
                    }
                }
            />

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE"
})(MapContainer)