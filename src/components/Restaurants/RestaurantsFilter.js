import React, {useContext, useState} from 'react';
import classes from './RestaurantsFilter.module.css';
import {RestaurantContext} from "../../store/RestaurantContext";

const RestaurantsFilter = () => {
    const [minStars, setMinStars] = useState(1);
    const [maxStars, setMaxStars] = useState(5);
    const ctx = useContext(RestaurantContext);

    const formRestaurantsFilter = (e) => {
        e.preventDefault();
        ctx.updateMinStars(minStars);
        ctx.updateMaxStars(maxStars);
    }

    const minStarsChangeHandler = (e) => {
        setMinStars(Number(e.target.value));
    }

    const maxStarsChangeHandler = (e) => {
        setMaxStars(Number(e.target.value));
    }

    return (
        <form className={classes.formFilter} onSubmit={formRestaurantsFilter}>
            <h4>Filtrer les restaurants par notes</h4>
            <div>
                <div className={classes.selectContainer}>
                    <span>Entre </span>
                    <select name="minStars" id="minStars" required onChange={minStarsChangeHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <span> Et </span>
                    <select name="maxStars" id="maxStars" value={maxStars} required onChange={maxStarsChangeHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <span> Étoiles</span>
                </div>
                <div>
                    <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type='submit'>
                        <span>Rechercher</span>
                    </button>
                </div>
            </div>

        </form>
    );
};

export default RestaurantsFilter;