import React, {useState} from 'react';

const RestaurantsFilter = () => {
    const [minStars, setMinStars] = useState();
    const [maxStars, setMaxStars] = useState();

    const formRestaurantsFilter = (e) => {
        e.preventDefault();
        alert("form submit");
        console.log(minStars, maxStars);
    }

    const minStarsChangeHandler = (e) => {
        console.log(e.target.value);
        setMinStars(e.target.value);
    }

    const maxStarsAmountChangeHandler = (e) => {
        console.log(e.target.value);
        setMaxStars(e.target.value);
    }

    return (
        <form onSubmit={formRestaurantsFilter}>
            <div>
                <h4>Filter restaurants by ratings</h4>
                <span>Entre</span>
                <input type="number" id="minStars" name="minStars" onChange={minStarsChangeHandler}
                       min="1" max="5" defaultValue={"1"} required/>
                <span>Et</span>
                <input type="number" id="maxStars" name="maxStars" onChange={maxStarsAmountChangeHandler}
                       min="1" max="5" defaultValue={"5"} required/>
                <span>Étoiles</span>
            </div>
            <div>
                <button type='submit'>Search</button>
            </div>
        </form>
    );
};

export default RestaurantsFilter;