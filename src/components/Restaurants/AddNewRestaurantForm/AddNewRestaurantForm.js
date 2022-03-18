import React, {useReducer, useContext} from 'react';
import classes from "./AddNewRestaurantForm.module.css";
import IconClose from "./../../../assets/images/cancel_circle_icon.svg";
import {RestaurantContext} from "../../../store/RestaurantContext";

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
        props.addNewRestaurant(newRestaurant);
        props.onHideAddNewRestaurantForm();
    };

    return (
        <>
            <div className={classes.overlay} onClick={props.onHideAddNewRestaurantForm}></div>
            <div className={classes.cartModal}>
                <div>
                    <img onClick={props.onHideAddNewRestaurantForm} src={IconClose} alt="close icon"/>
                    <h3>Add your restaurant</h3>
                    <form onSubmit={submitHandler}>
                        <div className="formGroup">
                            <label htmlFor="restaurantName">Enter your restaurant's name: </label>
                            <input
                                type="text"
                                name="restaurantName"
                                id="restaurantName"
                                required
                                value={state.restaurantName}
                                onChange={(e) => dispatch({type: "restaurantName", payload: e.target.value})}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="restaurantAddress">Enter your restaurant's address: </label>
                            <input
                                type="address"
                                name="restaurantAddress"
                                id="restaurantAddress"
                                required
                                value={state.restaurantAddress}
                                onChange={(e) => dispatch({type: "restaurantAddress", payload: e.target.value})}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="stars">Choose a rating:</label>
                            <select
                                name="stars"
                                id="stars"
                                value={state.stars}
                                onChange={(e) => dispatch({type: "stars", payload: e.target.value})}
                            >
                                <option value="">--Please choose a rating--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="comment">Add a comment: </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows="5"
                                cols="33"
                                value={state.comment}
                                onChange={(e) => dispatch({type: "comment", payload: e.target.value})}
                            />
                        </div>
                        <div>
                            <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type="submit">
                                <span>Add !</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default AddNewRestaurantForm;