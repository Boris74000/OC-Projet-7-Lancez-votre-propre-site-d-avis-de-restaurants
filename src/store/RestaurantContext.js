import React, {useState, createContext} from "react";

import restaurantsJson from "../assets/restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState(restaurantsJson);
    const [minStars, setMinStars] = useState(1);
    const [maxStars, setMaxStars] = useState(5);
    const [bounds, setBounds] = useState({});

    const updateRestaurants = (restaurantsUpdated) => {
        setRestaurants(prevState => [...prevState, restaurantsUpdated]);
    };

    const updateMinStars = (data) => {
        setMinStars(data);
    };

    const updateMaxStars = (data) => {
        setMaxStars(data);
    };

    const updateBounds = (data) => {
        setBounds(data);
    };

    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: restaurants,
                    minStars: minStars,
                    maxStars: maxStars,
                    bounds: bounds,
                    updateRestaurants: updateRestaurants,
                    updateMinStars: updateMinStars,
                    updateMaxStars: updateMaxStars,
                    updateBounds: updateBounds
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
