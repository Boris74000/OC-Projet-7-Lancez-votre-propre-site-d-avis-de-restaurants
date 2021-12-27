import React, {useState, useEffect} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';

import restaurants from "./restaurants.json";

const Map = () => {
    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={10}
            >
                {restaurants.map(
                    coords => <Marker
                        position=
                            {
                                {
                                    lat: coords.lat,
                                    lng: coords.long
                                }
                            }

                        icon={{url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
                    />
                )}

                <Marker
                    position={currentPosition}
                >
                    <InfoWindow
                        options=
                            {
                                {
                                    pixelOffset:
                                        {
                                            width: 0,
                                            height: -45
                                        }
                                }
                            }
                        position={currentPosition}>
                        <div>
                            <p>Your current position</p>
                        </div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;

