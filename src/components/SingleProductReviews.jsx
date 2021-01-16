import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    ["@media (max-width:740px)"]: {
      width: "auto",
      minWidth: 200,
    },
  },
  stars: {
    fontSize: "1rem",
  },
  starsContainter: {
    padding: 0,
    marginLeft: 0,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

function SingleProductReviews({ reviews }) {
  const classes = useStyles();
  // console.log("reviews in container: ", reviews);
  return (
    <div>
      <List className={classes.root}>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            if (!review.user) return;
            return (
              <div key={review.id}>
                <ListItem alignItems='flex-start' className={classes.listItem}>
                  <ListItemText primary={review.user.userName} />
                  <Box
                    component='fieldset'
                    borderColor='transparent'
                    className={classes.starsContainter}>
                    <Rating
                      name='read-only'
                      value={review.rating}
                      readOnly
                      className={classes.stars}
                    />
                  </Box>
                  <ListItemText secondary={review.comment} />
                </ListItem>
                <Divider variant='inset' component='li' />
              </div>
            );
          })
        ) : (
          <h3
            style={{
              margin: "100px auto",
              textAlign: "center",
              color: "gray",
            }}>
            There are no reviews aveilable for this book
          </h3>
        )}
      </List>
    </div>
  );
}

export default SingleProductReviews;
