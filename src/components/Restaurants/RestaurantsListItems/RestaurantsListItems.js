import React, {useContext, useEffect, useState} from "react";

import classes from "./RestaurantsListItems.module.css";
import IconPlus from "./../../../assets/images/add_circle_icon.svg";
import IconMinus from "./../../../assets/images/remove_circle_icon.svg";
import RestaurantsListItemsComments from "./RestaurantsListItemsComments";
import AddReviewForm from "../AddReviewForm";
import {RestaurantContext} from "../../../store/RestaurantContext";

const RestaurantsListItems = (props) => {
    const [isCommentShowed, setIsCommentShowed] = useState(false);
    const [newComment, setNewComment] = useState([]);
    const [ratingsAverage, setRatingsAverage] = useState([]);

    const ctx = useContext(RestaurantContext);

    const displayComment = () => {
        setIsCommentShowed(prevState => !prevState);
    }

    useEffect(()=> {
        setTimeout(()=> {

        let round = (props.elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / props.elt.ratings.length);

        if (round % 1 !== 0) {
            round = round.toFixed(1);
        }

        setRatingsAverage(round);
        }, 200);
    });

    const addReviewHandler = (reviewFormData) => {

        const newReview = [...props.elt.ratings, reviewFormData];
        ctx.updateRestaurantReview(props.elt.restaurantName, newReview);
    }

    return (
        <li className={classes.listItem}>
            <div>
                <h2>{props.name}</h2>
                <p>
                    <span>⭐ </span>
                    {ratingsAverage}
                </p>
                {/*<button onClick={displayComment}>Show comments</button>*/}
                {isCommentShowed ?
                    <img className="icon" onClick={displayComment} src={IconMinus} alt="Minus icon"/>
                    :
                    <img className="icon" onClick={displayComment} src={IconPlus} alt="Plus icon"/>
                }

            </div>

            <div>
                {isCommentShowed === true &&
                <img
                    src={`https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${props.lat},${props.lng}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`}
                    alt="restaurant picture"/>
                }

                {isCommentShowed === true &&
                props.elt.ratings.map((elt, index) =>
                    <RestaurantsListItemsComments
                        key={index}
                        comment={elt.comment}
                        stars={elt.stars}
                    />
                )
                }

                {isCommentShowed === true && newComment.length !== 0 &&
                newComment.map((elt, index) =>
                    <RestaurantsListItemsComments
                        key={index}
                        comment={elt.comment}
                        stars={elt.stars}
                    />
                )
                }

                {isCommentShowed === true &&
                <AddReviewForm
                    addReviewHandler={addReviewHandler}
                />
                }
            </div>


        </li>
    );
}

export default RestaurantsListItems;