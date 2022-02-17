import React, {useState} from 'react';

const AddReviewForm = (props) => {
    const [newStar, setNewStar] = useState();
    const [newComment, setNewComment] = useState("");

    const newStarChangeHandler = (e) => {
        setNewStar(e.target.value);
    }

    const newCommentChangeHandler = (e) => {
        setNewComment(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const newCommentWithStar = {
            stars: newStar,
            comment: newComment
        }
        props.addReviewHandler(newCommentWithStar);

    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="rating-select">Choose a rating:</label>
                <select name="rating-select" id="rating-select" onChange={newStarChangeHandler}>
                    <option value="">--Please choose a rating--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div>
                <label htmlFor="comment-area">Add a comment: </label>
                <textarea
                    id="comment-area"
                    name="comment-area"
                    rows="5"
                    cols="33"
                    onChange={newCommentChangeHandler}
                    value={newComment}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default AddReviewForm;

