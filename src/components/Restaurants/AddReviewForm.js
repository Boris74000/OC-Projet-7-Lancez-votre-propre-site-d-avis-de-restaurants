import React, {useState} from 'react';
import classes from "./AddReviewForm.module.css";

const AddReviewForm = (props) => {
    const [newStar, setNewStar] = useState();
    const [newComment, setNewComment] = useState("");

    const newStarChangeHandler = (e) => {
        setNewStar(Number(e.target.value));
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
        document.getElementById("rating-select").selectedIndex = 0;
        setNewComment("");
    }

    return (
        <form className={classes.addReviewForm} onSubmit={submitHandler}>
            <h3>Ajoutez votre commentaire</h3>
            <div className="formGroup">
                <label htmlFor="rating-select">Choisissez une note:</label>
                <select name="rating-select" id="rating-select" onChange={newStarChangeHandler}>
                    <option value="">Choisissez entre 1 et 5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="formGroup">
                <label htmlFor="comment-area">Ajoutez un commentaire: </label>
                <textarea
                    placeholder="Partagez votre expérience, comment était le repas, l'équipe, l'atmosphère ?"
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
                    <span>Ajouter</span>
                </button>
            </div>
        </form>
    );
};

export default AddReviewForm;

