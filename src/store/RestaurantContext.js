import React, { useState, createContext } from "react";

import restaurantsJson from "../restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [ restaurants, setRestaurants ] = useState(restaurantsJson);
    const [ restaurantsFilteredInList, setRestaurantsFilteredInList ] = useState(restaurantsJson);

    const updateRestaurants = (filteredRestaurants) => {
        console.log(filteredRestaurants);
        setRestaurantsFilteredInList(filteredRestaurants);
    }

    // En cours de dev
    const updateRestaurantsByRatings = (minStars, maxStars) => {
        console.log(minStars, maxStars);
        // setRestaurantsFilteredInList(filteredRestaurants);
        for (let i = 0; i < restaurantsFilteredInList.length; i++ ) {
            console.log(restaurantsFilteredInList[i].ratings);

            for (let j = 0; j < restaurantsFilteredInList[i].ratings.length; j++) {
                console.log(restaurantsFilteredInList[i].ratings[j]);
                const restaurantsFilteredByRatings = restaurantsFilteredInList.filter(restaurant => {
                    if ((restaurant.stars >= minStars) && (restaurant.stars <= maxStars)) {
                        return true;
                    }
                })
                console.log(restaurantsFilteredByRatings);
            }
        }
    }

    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: restaurants,
                    restaurantsFilteredInList: restaurantsFilteredInList,
                    updateRestaurants: updateRestaurants,
                    updateRestaurantsByRatings: updateRestaurantsByRatings
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
