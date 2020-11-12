import React, { useState, useEffect } from "react";
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

console.log(productId);


  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [letreview, setLetreview] = useState(false)


useEffect(()=>{
  axios.get(`http://localhost:1337/api/reviews/${productId}/${user.id}`)
    .then(res => res.data)
    .then(data => setLetreview(data))
    .then(()=> console.log("asd",letreview))
    .catch(err=>console.log(err))
},[letreview])


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
    {letreview?
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        + Agregar una review
      </Button>
      :
      <h2>you must have bought this book first to post a review</h2>
    }

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
