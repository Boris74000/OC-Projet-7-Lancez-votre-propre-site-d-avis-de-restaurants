import React, {useState} from 'react';
import classes from "./AddReviewForm.module.css";

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
        <form className={classes.addReviewForm} onSubmit={submitHandler}>
            <h3>Add your review</h3>
            <div className="formGroup">
                <label htmlFor="rating-select">Choose a rating:</label>
                <select name="rating-select" id="rating-select" onChange={newStarChangeHandler}>
                    <option value="">Choose between 1 and 5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="formGroup">
                <label htmlFor="comment-area">Add a comment: </label>
                <textarea
                    placeholder="Share your experience: how was your meal, staff, atmosphere ?"
                    id="comment-area"
                    name="comment-area"
                    rows="5"
                    cols="33"
                    onChange={newCommentChangeHandler}
                    value={newComment}
                />
            </div>
            <div>
                <button className={[classes.backgroundBtn, 'button', 'button--anthe'].join(' ')} type="submit">
                    <span>Add</span>
                </button>
            </div>
        </form>
    );
};

export default AddReviewForm;

