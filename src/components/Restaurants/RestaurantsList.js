import React from "react";
import RestaurantsListItems from "./RestaurantsListItems/RestaurantsListItems";
import classes from './RestaurantsList.module.css';

const RestaurantsList = (props) => {
    return (
        <ul className={classes.restaurantsList}>
            {props.restaurantsFiltered !== false ? props.restaurantsFiltered.map((elt, index) =>
                <RestaurantsListItems
                    key={index}
                    elt={elt}
                    name={elt.restaurantName}
                    lat={elt.lat}
                    lng={elt.lng}
                />
            ) :
                <li>Aucun restaurant ne correspond à vos critère</li>
            }
        </ul>
    );
}

export default RestaurantsList;