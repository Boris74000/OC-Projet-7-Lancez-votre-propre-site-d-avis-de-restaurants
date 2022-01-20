import React, {useContext, useState} from "react";
import {RestaurantContext} from './store/RestaurantContext';
import RestaurantsListItems from "./RestaurantsListItems";
import classes from './RestaurantsList.module.css';
import restaurantsJson from "./restaurants.json";

const RestaurantsList = (props) => {
    const {restaurants} = useContext(RestaurantContext);
    const [stateRestaurants, setStateRestaurants] = restaurants;
    const [isCommentShowed, setIsCommentShowed] = useState(false);

    console.log(restaurants);

    // return dishDataArray.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.amountOrdered, 0).toFixed(2);

    // const displayRatings = () => {
    //     for (let i = 0; i < stateRestaurants.length; i++) {
    //         // console.log(stateRestaurants[0].ratings);
    //         const sum = stateRestaurants[i].ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0);
    //         console.log(sum);
    //     }
    // }
    // displayRatings();

    const displayComment = () => {
        // alert("ici");
        setIsCommentShowed(prevCheck => !prevCheck);
        console.log(isCommentShowed);
    }

    return (
        <ul className={classes.restaurantsList}>
            { stateRestaurants.map((elt, index) =>
                <RestaurantsListItems
                    key={ index }
                    elt = { elt }
                    name={ elt.restaurantName }
                />
            )}
        </ul>

        // <ul className={classes.restaurantsList}>
        //     {stateRestaurants.map((items, index) => {
        //         return (
        //             <li key={index} onClick={displayComment} className={classes.restaurantsListItems}>
        //                 {items.restaurantName}
        //                 <p>
        //                     {/*{items.ratings.map((subItems, sIndex) => {*/}
        //                     {/*    return <li> {subItems.stars} </li>;*/}
        //                     {/*})}*/}
        //                     {items.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / items.ratings.length}
        //                 </p>
        //                 {isCommentShowed === true &&
        //                     <ul>
        //                         {items.ratings.map((items, index) => {
        //                             return (
        //                                 <li>{items.comment}</li>
        //                             )
        //                         })}
        //                     </ul>
        //                 }
        //             </li>
        //         );
        //     })}
        // </ul>
    );
}

export default RestaurantsList;