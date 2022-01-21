import React, { useState, createContext } from "react";

import restaurantsJson from "../restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [ restaurants, setRestaurants ] = useState(restaurantsJson);

    const updateRestaurants = (filteredRestaurants) => {
        console.log(filteredRestaurants);
        setRestaurants(filteredRestaurants);
    }

    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: restaurants,
                    updateRestaurants: updateRestaurants
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
