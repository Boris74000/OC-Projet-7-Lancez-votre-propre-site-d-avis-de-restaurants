import React, {useState} from "react";

import classes from "./RestaurantsListItems.module.css";
import RestaurantsListItemsComments from "./RestaurantsListItemsComments";

const RestaurantsListItems = (props) => {
    const [isCommentShowed, setIsCommentShowed] = useState(false);

    const displayComment = () => {
        setIsCommentShowed(prevState => !prevState);
    }

    return (
        <li onClick={displayComment} className={classes.listItem}>
            {props.name}
            <p>
                <span>Note moyenne: </span>
                {props.elt.ratings.reduce((previousValue, currentValue) => previousValue + currentValue.stars, 0) / props.elt.ratings.length}
            </p>

            {isCommentShowed === true &&
                <img src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${props.lat},${props.lng}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`} alt="restaurant picture"/>
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
        </li>
    );
}

export default RestaurantsListItems;