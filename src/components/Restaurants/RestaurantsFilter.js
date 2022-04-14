import React, {useContext, useState} from 'react';
import classes from './RestaurantsFilter.module.css';
import {RestaurantContext} from "../../store/RestaurantContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
            <h4>Filtrer les restaurants par notes:</h4>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel className="inputLabel" id="select-start-filter">Étoile</InputLabel>
                <Select
                    labelId="select-start-filter-label"
                    id="select-start-filter"
                    value={minStars}
                    onChange={minStarsChangeHandler}
                    className="select"
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">Étoile</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={maxStars}
                    onChange={maxStarsChangeHandler}
                    label="Étoiles"
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>
            <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type='submit'>
                <span>Rechercher</span>
            </button>
        </form>
    );
};

export default RestaurantsFilter;