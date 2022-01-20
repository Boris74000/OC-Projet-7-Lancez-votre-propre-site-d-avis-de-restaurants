import React, { useState } from "react";

import Map from "./Map";
import RestaurantsList from "./RestaurantsList";

import classes from "./App.module.css";
import { RestaurantContextProvider } from "./store/RestaurantContext";
import RestaurantsFilter from "./RestaurantsFilter";

function App() {
    return (
        <RestaurantContextProvider>
            <section>
                <RestaurantsFilter/>
            </section>
            <section className={ classes.mapAndListContainer }>
                <RestaurantsList
                    className={ classes.list }
                />
                <Map/>
            </section>
        </RestaurantContextProvider>
    );
}

export default App;
