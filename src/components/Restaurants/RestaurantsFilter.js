import React, {useContext, useState} from 'react';
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
        <form onSubmit={formRestaurantsFilter}>
            <div>
                <h4>Filter restaurants by ratings</h4>
                <span>Between </span>
                <select name="minStars" id="minStars" required onChange={minStarsChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span> And </span>
                <select name="maxStars" id="maxStars" value={maxStars} required onChange={maxStarsChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span> Stars</span>
            </div>
            <div>
                <button type='submit'>Search</button>
            </div>
        </form>
    );
};

export default RestaurantsFilter;