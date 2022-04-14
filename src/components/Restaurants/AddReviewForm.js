import React, {useState} from 'react';
import classes from "./AddReviewForm.module.css";
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const AddReviewForm = (props) => {
    const [newStar, setNewStar] = useState(1);
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
        setNewStar(1);
        setNewComment("");
    }

    return (
        <form className={classes.addReviewForm} onSubmit={submitHandler}>
            <h3>Ajoutez votre commentaire</h3>
            <FormControl variant="standard" sx={{mb: 2, minWidth: 120}}>
                <InputLabel className="inputLabel" id="select-start-add-review">Choisissez une note</InputLabel>
                <Select
                    labelId="select-start-add-review-label"
                    id="select-start-add-review"
                    value={newStar}
                    onChange={newStarChangeHandler}
                    className="select"
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>
            <div className="formGroup">
                <TextField
                    id="standard-multiline-flexible"
                    label="Ajoutez un commentaire:"
                    multiline
                    placeholder="Partagez votre expérience, comment était le repas, l'équipe, l'atmosphère ?"
                    maxRows={4}
                    value={newComment}
                    onChange={newCommentChangeHandler}
                    variant="standard"
                    className="textArea"
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

