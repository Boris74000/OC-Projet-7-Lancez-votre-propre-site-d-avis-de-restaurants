import React, {useState, createContext} from "react";

import restaurantsJson from "../assets/restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState(restaurantsJson);
    const [minStars, setMinStars] = useState(1);
    const [maxStars, setMaxStars] = useState(5);

    const updateRestaurants = (restaurantsUpdated) => {
        setRestaurants(prevState => [...restaurants, restaurantsUpdated]);
    };

    const updateMinStars = (data) => {
        setMinStars(data);
    };

    const updateMaxStars = (data) => {
        setMaxStars(data);
    };


    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: restaurants,
                    minStars: minStars,
                    maxStars: maxStars,
                    updateRestaurants: updateRestaurants,
                    updateMinStars: updateMinStars,
                    updateMaxStars: updateMaxStars
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
