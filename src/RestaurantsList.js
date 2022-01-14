import React from "react";

import RestaurantsListItems from "./RestaurantsListItems";

const RestaurantsList = (props) => {
    // console.log(props.restaurantsJson);

    return (
        <ul>
            {props.restaurantsJson.map((elt, index) =>
                <RestaurantsListItems
                    key={index}
                    name={elt.restaurantName}
                />
            )}
        </ul>
    );
}

export default RestaurantsList;