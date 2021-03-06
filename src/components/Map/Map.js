import React, {useState, useCallback, useEffect, useContext} from "react";

import googleMapApiKey from "./../../assets/googleMapApiKey.json";

import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import AddNewRestaurantForm from "../Restaurants/AddNewRestaurantForm/AddNewRestaurantForm";

import classes from "./Map.module.css";

import {RestaurantContext} from "../../store/RestaurantContext";

const Map = (props) => {
    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    const [isDisplayAddNewRestaurantForm, setIsDisplayAddNewRestaurantForm] = useState(false);
    const [isDisplayInfoWindowMarker, setIsDisplayInfoWindowMarker] = useState(false);
    const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState();
    const [positionClickedOnMap, setPositionClickedOnMap] = useState();
    const [libraries] = useState(['places']);

    const ctx = useContext(RestaurantContext);

    const addNewRestaurant = (data) => {
        props.addNewRestaurant(data);
    }

    const getBounds = () => {
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

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(success);
        navigator.geolocation.getCurrentPosition(function (position) {
                const currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                setCurrentPosition(currentPosition);
            },
            function (e) {
                setCurrentPosition(false);
            });
    }, []);


    const containerStyle = {
        height: "100%",
        width: "100%"
    };

    const {isLoaded, loadError} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: googleMapApiKey.key,
        libraries
    });

    const onMapLoad = (map) => {
        let service = new window.google.maps.places.PlacesService(map);

        let request = {
            location: currentPosition ? {lng: currentPosition.lng, lat: currentPosition.lat} : {lng: 6.129017551823277, lat: 45.89925328534124},
            // location: {lng: currentPosition.lng, lat: currentPosition.lat},
            radius: '800',
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

    const handleToggleOpen = (markerId) => {
        setIsDisplayInfoWindowMarker(true);
        setOpenInfoWindowMarkerId(markerId);
    }

    const hideInfoWindow = () => {
        setIsDisplayInfoWindowMarker(false);
    }

    return isLoaded ? (
        <div className={classes.mapContainer}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition ?
                    currentPosition
                    :
                    {
                        lat: 45.89925328534124,
                        lng: 6.129017551823277
                    }
                }
                zoom={11}
                onLoad={(map) => onMapLoad(map)}
                onBoundsChanged={getBounds}
                onClick={getPositionClickedOnMap}
            >

                {props.restaurantsFiltered !== false && props.restaurantsFiltered.map(
                    (element, index) =>
                        <Marker
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
                            onClick={() => handleToggleOpen(index)}
                        >
                            {openInfoWindowMarkerId === index && isDisplayInfoWindowMarker === true &&
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
                                position=
                                    {
                                        {
                                            lat: element.lat,
                                            lng: element.lng
                                        }
                                    }
                                onCloseClick={hideInfoWindow}
                            >

                                <div className={classes.infoWindow}>
                                    <img
                                        src={`https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${element.lat},${element.lng}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`}
                                        alt="restaurant picture"
                                    />
                                    <p>{element.restaurantName}</p>
                                </div>

                            </InfoWindow>
                            }
                        </Marker>
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
                        position={currentPosition}
                    >
                        <div>
                            <p>Votre position actuelle</p>
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
