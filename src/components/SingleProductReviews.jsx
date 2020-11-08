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
  },
  block: {
    display: "block",
  },
  stars: {
    fontSize: "1rem",
  },
  starsContainter: {
    padding: 0,
    marginLeft: 0,
  },
}));

function SingleProductReviews({ reviews }) {
  const classes = useStyles();
  console.log("reviews in container: ", reviews);
  return (
    <div>
      <List className={classes.root}>
        {reviews.map((review) => {
          if (!review.user) return;
          return (
            <div>
              <ListItem alignItems='flex-start' key={review.id}>
                <ListItemText
                  primary={review.user.userName}
                  secondary={
                    <React.Fragment>
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
                      {review.comment}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </div>
          );
        })}
      </List>
    </div>
  );
}

export default SingleProductReviews;
