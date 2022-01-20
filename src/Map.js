import React, { useState, useCallback, useContext } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { RestaurantContext } from "./store/RestaurantContext";
import restaurantsJson from "./restaurants.json";

const Map = (props) => {
    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    const [bounds, setBounds] = useState();
    // const [markers, setMarkers] = useState(props.restaurantsJson);
    // const [restaurants, setRestaurants ] = useContext(RestaurantContext);

    // console.log(ctx.restaurants)
    const {restaurants, restaurantsInBounds} = useContext(RestaurantContext);
    const [ stateRestaurants, setStateRestaurants ] = restaurants;
    const [ stateRestaurantsInBounds, setStateRestaurantsInBounds ] = restaurantsInBounds;

    const getBounds = () => {
        const boundsNordEstlat = map.getBounds().getNorthEast().lat();
        const boundsNordEstlng = map.getBounds().getNorthEast().lng();
        const boundsSudOuestlat = map.getBounds().getSouthWest().lat();
        const boundsSudOuestlng = map.getBounds().getSouthWest().lng();

        const filteredRestaurants = stateRestaurants.filter(restaurant => {
                if ((restaurant.lat > boundsSudOuestlat) &&
                    (restaurant.lat < boundsNordEstlat) &&
                    (restaurant.lng > boundsSudOuestlng) &&
                    (restaurant.lng < boundsNordEstlng)) {
                    return true;
                }
            }
        );

        console.log(filteredRestaurants);
        // setStateRestaurantsInBounds(filteredRestaurants);
        // console.log(stateRestaurantsInBounds);
        // console.log(restaurantsInBounds);

    }

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    // useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    // })

    const containerStyle = {
        width: '400px',
        height: '400px'
    };


    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE"
    });

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        // map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            // center={center}
            center={currentPosition}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            // onDragEnd={() => console.log(map.getBounds())}
            onDragEnd={getBounds}
        >
            {stateRestaurants.map(
                (element, index) => <Marker
                    key={index}
                    position=
                        {
                            {
                                lat: element.lat,
                                lng: element.lng
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
    ) : (
        <p>Map can't be load</p>
    );
}

export default React.memo(Map);
