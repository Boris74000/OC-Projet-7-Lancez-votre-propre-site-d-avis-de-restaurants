import React, {useState} from "react";

import classes from "./RestaurantsListItems.module.css";
import RestaurantsListItemsComments from "./RestaurantsListItemsComments";
import AddReviewForm from "./AddReviewForm";

const RestaurantsListItems = (props) => {
    const [isCommentShowed, setIsCommentShowed] = useState(false);
    const [newComment, setNewComment] = useState([]);

    const displayComment = () => {
        setIsCommentShowed(prevState => !prevState);
    }
    const ratingsAverage = props.elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / props.elt.ratings.length;

    const addReviewHandler = (reviewFormData) => {
        setNewComment(prevState => {
            const updatedNewComment = [...prevState];
            updatedNewComment.push(reviewFormData);
            return updatedNewComment;
        })
    }

    return (
        <li className={classes.listItem}>
            {props.name}
            <p>
                <span>Ratings Average: </span>
                {ratingsAverage}
            </p>

            <button onClick={displayComment}>Show comments</button>

            {isCommentShowed === true &&
            <img
                src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${props.lat},${props.lng}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`}
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

        </li>
    );
}

export default RestaurantsListItems;