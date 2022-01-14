import React from "react";

import restaurantsJson from "./restaurants.json";

import Map from "./Map";
import RestaurantsList from "./RestaurantsList";

import classes from "./App.module.css";

function App() {

    return (
        <section className={classes.mapAndListContainer}>
            <RestaurantsList className={classes.list} restaurantsJson={restaurantsJson}/>
            <Map restaurantsJson={restaurantsJson}/>
        </section>

    );
}

export default App;
