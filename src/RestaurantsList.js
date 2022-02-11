import React, {useContext, useEffect, useState} from "react";
import {RestaurantContext} from './store/RestaurantContext';
import RestaurantsListItems from "./RestaurantsListItems";
import classes from './RestaurantsList.module.css';

const RestaurantsList = () => {
    const ctx = useContext(RestaurantContext);
    const [restaurantsFilteredWithRatings, setRestaurantsFilteredWithRatings] = useState(ctx.restaurantsFilteredInList);

    useEffect(() => {
        const ratingsRestaurantsFilter = ctx.restaurantsFilteredInList.filter(elt => {
            const ratingsAverage = elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / elt.ratings.length;
            if (ratingsAverage >= ctx.minStars && ratingsAverage <= ctx.maxStars) {
                return elt;
            }
        });

        setRestaurantsFilteredWithRatings(ratingsRestaurantsFilter);

    }, [ctx.minStars, ctx.maxStars]);

    return (
        <ul className={classes.restaurantsList}>
            {restaurantsFilteredWithRatings.map((elt, index) =>
                <RestaurantsListItems
                    key={index}
                    elt={elt}
                    name={elt.restaurantName}
                    lat={elt.lat}
                    lng={elt.lng}
                />
            )}
        </ul>
    );
}

export default RestaurantsList;