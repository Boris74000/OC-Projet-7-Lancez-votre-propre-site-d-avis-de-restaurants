import React, {useContext, useState} from "react";
import {RestaurantContext} from './store/RestaurantContext';
import RestaurantsListItems from "./RestaurantsListItems";
import classes from './RestaurantsList.module.css';

const RestaurantsList = () => {
    const [isCommentShowed, setIsCommentShowed] = useState(false);
    const ctx = useContext(RestaurantContext);

    const displayComment = () => {
        setIsCommentShowed(prevCheck => !prevCheck);
        console.log(isCommentShowed);
    }

    return (
        <ul className={classes.restaurantsList}>
            { ctx.restaurants.map((elt, index) =>
                <RestaurantsListItems
                    key={ index }
                    elt = { elt }
                    name={ elt.restaurantName }
                />
            )}
        </ul>
    );
}

export default RestaurantsList;