import React, {useReducer, useContext} from 'react';
import classes from "./AddNewRestaurantForm.module.css";
import IconClose from "./../../../assets/images/cancel_circle_icon.svg";
import {RestaurantContext} from "../../../store/RestaurantContext";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const AddNewRestaurantForm = (props) => {
    const ctx = useContext(RestaurantContext);
    const initialState = {
        restaurantName: "",
        restaurantAddress: "",
        stars: "",
        comment: ""
    };

    const formReducer = (state, {type, payload}) => {
        switch (type) {
            case 'restaurantName':
                return {...state, restaurantName: payload}
            case 'restaurantAddress':
                return {...state, restaurantAddress: payload}
            case 'stars':
                return {...state, stars: payload}
            case 'comment':
                return {...state, comment: payload}
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, initialState);

    const submitHandler = (e) => {
        e.preventDefault();

        const newRestaurant = {
            "restaurantName": state.restaurantName,
            "address": state.restaurantAddress,
            "lat": props.positionClickedOnMap.latLng.lat(),
            "lng": props.positionClickedOnMap.latLng.lng(),
            "ratings": [
                {
                    "stars": Number(state.stars),
                    "comment": state.comment
                }
            ]
        };
        ctx.updateRestaurants(newRestaurant);
        props.onHideAddNewRestaurantForm();
    };

    return (
        <>
            <div className={classes.overlay} onClick={props.onHideAddNewRestaurantForm}></div>
            <div className={classes.cartModal}>
                <div>
                    <img className="icon" onClick={props.onHideAddNewRestaurantForm} src={IconClose} alt="close icon"/>
                    <h3>Ajoutez votre restaurant</h3>
                    <form onSubmit={submitHandler} className={classes.addNewRestaurantForm}>
                        <div className="formGroup">
                            <TextField
                                label="Entrez le nom de votre restaurant:"
                                required
                                variant="standard"
                                value={state.restaurantName}
                                onChange={(e) => dispatch({type: "restaurantName", payload: e.target.value})}
                                className="MuiInput-root"
                            />
                        </div>
                        <div className="formGroup">
                            <TextField
                                label="Entrez l'adresse du restaurant:"
                                required
                                variant="standard"
                                value={state.restaurantAddress}
                                onChange={(e) => dispatch({type: "restaurantAddress", payload: e.target.value})}
                            />
                        </div>
                        <FormControl variant="standard" sx={{minWidth: 180, marginBottom: 2}}>
                            <InputLabel className="inputLabel" id="select-start-add-restaurant">Choisissez une note</InputLabel>
                            <Select
                                labelId="select-start-add-restaurant-label"
                                id="select-start-add-restaurant"
                                value={state.stars}
                                onChange={(e) => dispatch({type: "stars", payload: e.target.value})}
                                className="select"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="formGroup">
                            <TextField
                                id="standard-multiline-flexible"
                                label="Ajoutez un commentaire:"
                                multiline
                                placeholder="Partagez votre expérience, comment était le repas, l'équipe, l'atmosphère ?"
                                maxRows={4}
                                value={state.comment}
                                onChange={(e) => dispatch({type: "comment", payload: e.target.value})}
                                variant="standard"
                            />
                        </div>
                        <div>
                            <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type="submit">
                                <span>Ajouter !</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default AddNewRestaurantForm;