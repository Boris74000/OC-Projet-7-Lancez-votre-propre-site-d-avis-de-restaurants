import React, {useEffect, useState, useContext} from "react";

import Map from "./components/Map/Map";
import RestaurantsList from "./components/Restaurants/RestaurantsList";
import {RestaurantContext} from "./store/RestaurantContext";
import classes from "./App.module.css";
import RestaurantsFilter from "./components/Restaurants/RestaurantsFilter";
import restaurantsJson from "./assets/restaurants.json";

function App() {
    const ctx = useContext(RestaurantContext);
    const [restaurantsFiltered, setRestaurantsFiltered] = useState(restaurantsJson);

    const addNewRestaurant = (data) => {
        setRestaurantsFiltered([...restaurantsFiltered, data]);
    };

    const getBounds = (boundsNordEstlat, boundsNordEstlng, boundsSudOuestlat, boundsSudOuestlng) => {
        filterRestaurantsWithBounds(boundsNordEstlat, boundsNordEstlng, boundsSudOuestlat, boundsSudOuestlng);
    };

    const filterRestaurantsWithBounds = (boundsNordEstlat, boundsNordEstlng, boundsSudOuestlat, boundsSudOuestlng) => {
        const filteredRestaurants = ctx.restaurants.filter(restaurant => {
                if ((restaurant.lat > boundsSudOuestlat) &&
                    (restaurant.lat < boundsNordEstlat) &&
                    (restaurant.lng > boundsSudOuestlng) &&
                    (restaurant.lng < boundsNordEstlng)) {
                    return true;
                }
            }
        );
        setRestaurantsFiltered(filteredRestaurants);
    };

    useEffect(() => {
        const ratingsRestaurantsFilter = ctx.restaurants.filter(elt => {
            const ratingsAverage = elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / elt.ratings.length;
            if (ratingsAverage >= ctx.minStars && ratingsAverage <= ctx.maxStars) {
                return elt;
            }
        });
        if (ratingsRestaurantsFilter.length > 0) {
            setRestaurantsFiltered(ratingsRestaurantsFilter);
        }

    }, [ctx.minStars, ctx.maxStars]);


    return (
        <>
            <section>
                <RestaurantsFilter/>
            </section>
            <section className={classes.mapAndListContainer}>
                <RestaurantsList
                    className={classes.list}
                    restaurantsFiltered={restaurantsFiltered}
                />
                <Map
                    getBounds={getBounds}
                    restaurantsFiltered={restaurantsFiltered}
                    addNewRestaurant={addNewRestaurant}
                />
            </section>
        </>
    );
}

export default App;
