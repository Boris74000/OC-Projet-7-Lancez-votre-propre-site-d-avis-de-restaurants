import React, {useState, useCallback, useEffect, useContext} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import AddNewRestaurantForm from "../Restaurants/AddNewRestaurantForm/AddNewRestaurantForm";
import classes from "./Map.module.css";
import {RestaurantContext} from "../../store/RestaurantContext";

const Map = (props) => {
    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    const [isDisplayAddNewRestaurantForm, setIsDisplayAddNewRestaurantForm] = useState(false);
    const [positionClickedOnMap, setPositionClickedOnMap] = useState();
    const [restaurantsWithGooglePlaces, setRestaurantsWithGooglePlaces] = useState([]);

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
        height: "100%",
        width: "100%"
    };

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE",
        libraries: ["places"]
    });

    const onMapLoad = (map) => {
        let service = new window.google.maps.places.PlacesService(map);

        let request = {
            location: {lng: 6.126262142126459, lat: 45.90202596575145},
            radius: '40',
            type: ['restaurant']
        };

        service.nearbySearch(request, (results, status) => {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                for (const result of results) {

                    let request2 = {
                        placeId: result.place_id,
                        fields: ['reviews']
                    }

                    const ratings = [];
                    service.getDetails(request2, function (place, status) {
                        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                            for (const placeElement of place.reviews) {
                                ratings.push(
                                    {
                                        stars: placeElement.rating,
                                        comment: placeElement.text
                                    }
                                )
                            }
                        }
                    });

                    let newRestaurantGooglePlaces = {
                        "restaurantName": result.name,
                        "address": result.vicinity,
                        "lat": result.geometry.location.lat(),
                        "lng": result.geometry.location.lng(),
                        "ratings": ratings
                    };

                    ctx.updateRestaurants(newRestaurantGooglePlaces);
                    addNewRestaurant(newRestaurantGooglePlaces);
                }

            }
        });
        setMap(map);
    };

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
        <div className={classes.mapContainer}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={11}
                onLoad={(map) => onMapLoad(map)}
                onUnmount={onUnmount}
                onDragEnd={getRestaurantsInBounds}
                onClick={getPositionClickedOnMap}
            >
                {restaurantsWithGooglePlaces !== [] && restaurantsWithGooglePlaces.map(
                    (element, index) => <Marker
                        key={index}
                        position=
                            {
                                {
                                    lat: element.lat,
                                    lng: element.lng
                                }
                            }
                        icon={{url: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png"}}
                        name={element.restaurantName}
                    />
                )};


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
        </div>

    ) : (
        <p>Map can't be load</p>
    );
}

export default React.memo(Map);
