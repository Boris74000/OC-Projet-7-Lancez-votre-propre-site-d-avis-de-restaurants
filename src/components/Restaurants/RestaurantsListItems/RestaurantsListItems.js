import React, {useEffect, useState} from "react";

import classes from "./RestaurantsListItems.module.css";
import IconPlus from "./../../../assets/images/add_circle_icon.svg";
import IconMinus from "./../../../assets/images/remove_circle_icon.svg";
import RestaurantsListItemsComments from "./RestaurantsListItemsComments";
import AddReviewForm from "../AddReviewForm";

const RestaurantsListItems = (props) => {
    const [isCommentShowed, setIsCommentShowed] = useState(false);
    const [newComment, setNewComment] = useState([]);
    const [ratingsAverage, setRatingsAverage] = useState([]);

    const displayComment = () => {
        setIsCommentShowed(prevState => !prevState);
    }

    useEffect(()=> {
        setTimeout(()=> {
        setRatingsAverage(props.elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / props.elt.ratings.length);
        }, 200);
    });

    const addReviewHandler = (reviewFormData) => {
        setNewComment(prevState => {
            const updatedNewComment = [...prevState];
            updatedNewComment.push(reviewFormData);
            return updatedNewComment;
        })
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
                    <img onClick={displayComment} src={IconMinus} alt="Minus icon"/>
                    :
                    <img onClick={displayComment} src={IconPlus} alt="Plus icon"/>
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