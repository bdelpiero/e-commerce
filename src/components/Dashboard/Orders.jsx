import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ orders }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length !== 0 &&
            orders
              .filter((order) => order.status != "Pendiente")
              .reverse()
              .slice(0, 5)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.updatedAt.substring(0, 10)}</TableCell>
                  <TableCell>
                    {`${order.firstName} ${order.lastName}` || "hardcodeado"}
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell align='right'>{order.total || 0}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color='primary' to='/configs/allorders'>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
