import React from "react";

import classes from "./RestaurantsListItems.module.css";

const RestaurantsListItems = (props) => {
    return (
        <li className={classes.listItem}>
            {props.name}
        </li>
    );
}

export default RestaurantsListItems;