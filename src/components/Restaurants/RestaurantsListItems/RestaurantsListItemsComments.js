import React from 'react';

const RestaurantsListItemsComments = (props) => {
    return (
        <p>
            <span>{props.stars}⭐ => </span>{props.comment}
        </p>
    );
};

export default RestaurantsListItemsComments;