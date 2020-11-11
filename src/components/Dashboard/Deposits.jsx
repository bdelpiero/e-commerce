import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ orders }) {
  const classes = useStyles();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const formateDate = mm + "/" + dd + "/" + yyyy;
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        ${" "}
        {orders.reduce((acc, current) => {
          return (acc += current.total);
        }, 0)}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {`on ${formateDate}`}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
