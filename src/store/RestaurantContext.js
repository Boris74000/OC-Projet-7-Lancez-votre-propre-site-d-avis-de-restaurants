import React, { useState, createContext } from "react";

import restaurantsJson from "../restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    // console.log(restaurantsJson);
    const [ restaurants, setRestaurants ] = useState(restaurantsJson);
    const [ restaurantsInBounds, setRestaurantsInBounds ] = useState();

    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: [restaurants, setRestaurants],
                    restaurantsInBounds: [restaurantsInBounds, setRestaurantsInBounds]
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
