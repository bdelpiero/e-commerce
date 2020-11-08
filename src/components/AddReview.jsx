import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  starsContainter: {
    padding: 0,
    margin: 0,
  },
  dialogBox: {
    width: 500,
  },
}));

function FormDialog({ productId, user, setReviews, reviews }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReview = () => {
    // axios que agrega la review
    axios
      .post(`http://localhost:1337/api/reviews/${productId}`, {
        rating,
        comment,
      })
      .then((res) => res.data)
      .then((review) => {
        console.log("review devuelta por el back :", review);
        setReviews([...reviews, review]);
        setOpen(false);
      })
      .catch((err) => console.log(err));
    // agarrar la review, agregarle una prop con el user (review.user = user)
    // cambiar el estado en singleProduct: setUser={}
    // cerrar el backdrop
  };

  return (
    <div className={classes.root}>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        + Agregar una review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Dejanos tu opinión</DialogTitle>
        <DialogContent className={classes.dialogBox}>
          <Box
            component='fieldset'
            mb={3}
            borderColor='transparent'
            className={classes.starsContainter}>
            <Rating
              name='simple-controlled'
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <TextField
            value={comment}
            autoFocus
            multiline
            margin='dense'
            id='opinion'
            label='Opinión'
            type='text'
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleReview} color='primary'>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
