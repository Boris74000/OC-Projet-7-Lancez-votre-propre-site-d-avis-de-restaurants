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
                <InputLabel className={classes.inputLabel} id="demo-simple-select-standard-label">Étoile</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={minStars}
                    onChange={minStarsChangeHandler}
                    label="Étoiles"
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>Aucun</em>
                    </MenuItem>
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

            {/*------------- Ancien code -----------------------------*/}
            {/*<div>*/}
            {/*    <div className={classes.selectContainer}>*/}
            {/*        <span>Entre </span>*/}
            {/*        <select name="minStars" id="minStars" required onChange={minStarsChangeHandler}>*/}
            {/*            <option value="1">1</option>*/}
            {/*            <option value="2">2</option>*/}
            {/*            <option value="3">3</option>*/}
            {/*            <option value="4">4</option>*/}
            {/*            <option value="5">5</option>*/}
            {/*        </select>*/}
            {/*        <span> Et </span>*/}
            {/*        <select name="maxStars" id="maxStars" value={maxStars} required onChange={maxStarsChangeHandler}>*/}
            {/*            <option value="1">1</option>*/}
            {/*            <option value="2">2</option>*/}
            {/*            <option value="3">3</option>*/}
            {/*            <option value="4">4</option>*/}
            {/*            <option value="5">5</option>*/}
            {/*        </select>*/}
            {/*        <span> Étoiles</span>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type='submit'>*/}
            {/*            <span>Rechercher</span>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*------------- Ancien code -----------------------------*/}


        </form>
    );
};

export default RestaurantsFilter;