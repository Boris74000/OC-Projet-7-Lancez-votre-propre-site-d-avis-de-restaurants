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

    useEffect(() => {
        const filteredRestaurantsWithBounds = ctx.restaurants.filter(restaurant => {
                if ((restaurant.lat > ctx.bounds.boundsSudOuestlat) &&
                    (restaurant.lat < ctx.bounds.boundsNordEstlat) &&
                    (restaurant.lng > ctx.bounds.boundsSudOuestlng) &&
                    (restaurant.lng < ctx.bounds.boundsNordEstlng)) {
                    return true;
                }
            }
        );

        const filteredRestaurantsWithRatings = filteredRestaurantsWithBounds.filter(elt => {
            const ratingsAverage = elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / elt.ratings.length;
            if (ratingsAverage >= ctx.minStars && ratingsAverage <= ctx.maxStars) {
                return elt;
            }
        });

            if (filteredRestaurantsWithRatings.length > 0) {
                setRestaurantsFiltered(filteredRestaurantsWithRatings);
            } else {
                setRestaurantsFiltered(false);
            }

    }, [ctx.minStars, ctx.maxStars, ctx.bounds]);


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
                    restaurantsFiltered={restaurantsFiltered}
                    addNewRestaurant={addNewRestaurant}
                />
            </section>
        </>
    );
}

export default App;
