import React, {useState, createContext} from "react";

import restaurantsJson from "../restaurants.json";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState(restaurantsJson);
    const [restaurantsFilteredInList, setRestaurantsFilteredInList] = useState(restaurantsJson);
    const [minStars, setMinStars] = useState(1);
    const [maxStars, setMaxStars] = useState(5);

    const updateRestaurants = (restaurantsUpdated) => {
        console.log(restaurantsUpdated);
        setRestaurants([...restaurants, restaurantsUpdated]);
    }

    const updateRestaurantsFilteredInList = (filteredRestaurants) => {
        console.log(filteredRestaurants);
        console.log("context")
        setRestaurantsFilteredInList(filteredRestaurants);
    };

    const updateMinStars = (data) => {
        console.log(data);
        setMinStars(data);
    };

    const updateMaxStars = (data) => {
        console.log(data);
        setMaxStars(data);
    };


    return (
        <RestaurantContext.Provider
            value={
                {
                    restaurants: restaurants,
                    restaurantsFilteredInList: restaurantsFilteredInList,
                    minStars: minStars,
                    maxStars: maxStars,
                    updateRestaurants: updateRestaurants,
                    updateRestaurantsFilteredInList: updateRestaurantsFilteredInList,
                    updateMinStars: updateMinStars,
                    updateMaxStars: updateMaxStars
                }
            }
        >
            {props.children}
        </RestaurantContext.Provider>
    );
};
