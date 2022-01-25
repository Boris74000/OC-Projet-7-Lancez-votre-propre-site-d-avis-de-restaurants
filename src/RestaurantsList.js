import React, {useContext} from "react";
import {RestaurantContext} from './store/RestaurantContext';
import RestaurantsListItems from "./RestaurantsListItems";
import classes from './RestaurantsList.module.css';

const RestaurantsList = () => {
    const ctx = useContext(RestaurantContext);

    return (
        <ul className={classes.restaurantsList}>
            { ctx.restaurantsFilteredInList.map((elt, index) =>
                <RestaurantsListItems
                    key={ index }
                    elt = { elt }
                    name={ elt.restaurantName }
                    lat={elt.lat}
                    lng={elt.lng}
                />
            )}
        </ul>
    );
}

export default RestaurantsList;