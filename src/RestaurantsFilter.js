import React, {useState} from 'react';

const RestaurantsFilter = () => {
    const [minStars, setMinStars] = useState(1);
    const [maxStars, setMaxStars] = useState(5);

    const formRestaurantsFilter = (e) => {
        e.preventDefault();
        console.log("form submit");
        console.log(minStars, maxStars);
    }

    const minStarsChangeHandler = (e) => {
        console.log(e.target.value);
        setMinStars(e.target.value);
    }

    const maxStarsAmountChangeHandler = (e) => {
        console.log(e.target.value);
        setMaxStars(Number(e.target.value));
    }

    return (
        <form onSubmit={formRestaurantsFilter}>
            <div>
                <h4>Filter restaurants by ratings</h4>
                <span>Entre</span>
                <select name="minStars" id="minStars" required onChange={minStarsChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span>Et</span>
                <select name="maxStars" id="maxStars" value={maxStars} required onChange={maxStarsAmountChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <span>Étoiles</span>
            </div>
            <div>
                <button type='submit'>Search</button>
            </div>
        </form>
    );
};

export default RestaurantsFilter;