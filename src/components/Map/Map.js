import React, {useState, useCallback, useEffect, useContext} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import AddNewRestaurantForm from "../Restaurants/AddNewRestaurantForm/AddNewRestaurantForm";
import {RestaurantContext} from "../../store/RestaurantContext";

const Map = (props) => {
    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    const [isDisplayAddNewRestaurantForm, setIsDisplayAddNewRestaurantForm] = useState(false);
    const [positionClickedOnMap, setPositionClickedOnMap] = useState();

    const ctx = useContext(RestaurantContext);

    const addNewRestaurant = (data) => {
        props.addNewRestaurant(data);
    }

    const getRestaurantsInBounds = () => {
        ctx.updateBounds({
            boundsNordEstlat: map.getBounds().getNorthEast().lat(),
            boundsNordEstlng: map.getBounds().getNorthEast().lng(),
            boundsSudOuestlat: map.getBounds().getSouthWest().lat(),
            boundsSudOuestlng: map.getBounds().getSouthWest().lng()
        });
    }

    const getPositionClickedOnMap = (e) => {
        setIsDisplayAddNewRestaurantForm(true);
        setPositionClickedOnMap(e);
    }

    const HideAddNewRestaurantForm = () => {
        setIsDisplayAddNewRestaurantForm(false);
    }

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: ""
    });

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    useEffect(() => {
       setTimeout(() => {
           ctx.updateBounds({
               boundsNordEstlat: map.getBounds().getNorthEast().lat(),
               boundsNordEstlng: map.getBounds().getNorthEast().lng(),
               boundsSudOuestlat: map.getBounds().getSouthWest().lat(),
               boundsSudOuestlng: map.getBounds().getSouthWest().lng()
           });
       }, 100);
    }, [map]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onDragEnd={getRestaurantsInBounds}
                onClick={getPositionClickedOnMap}
            >
                {props.restaurantsFiltered !== false && props.restaurantsFiltered.map(
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
                                            height: 0
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

            {isDisplayAddNewRestaurantForm &&
                <AddNewRestaurantForm
                    onHideAddNewRestaurantForm={HideAddNewRestaurantForm}
                    positionClickedOnMap={positionClickedOnMap}
                    addNewRestaurant={addNewRestaurant}
                />
            }
        </>

    ) : (
        <p>Map can't be load</p>
    );
}

export default React.memo(Map);
