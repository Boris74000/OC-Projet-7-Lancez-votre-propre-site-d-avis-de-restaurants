import React, {useState, useEffect} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow, useGoogleMap} from '@react-google-maps/api';


const Map = (props) => {
    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    const map = useGoogleMap()

    React.useEffect(() => {
        if (map) {
            console.log(map.getBounds());
        }
    }, [map])

    // useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    // })

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const getBounds = () => {
        const bounds = new window.google.maps.LatLngBounds();
        console.log(bounds);
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={10}
                onDragEnd={getBounds}
            >
                {props.restaurantsJson.map(
                    (element, index) => <Marker
                        key={index}
                        // ref={onMarkerMounted}
                        position=
                            {
                                {
                                    lat: element.lat,
                                    lng: element.long
                                }
                            }

                        icon={{url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
                        name={element.restaurantName}
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

