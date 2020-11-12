import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Dashboard/Title";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    position: "absolute",
    left: 300,
    marginTop: 20,
  },
}));

export default function AllOrders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/orders")
      .then((res) => res.data)
      .then((orders) => setOrders(orders))
      .then((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <div className={classes.container} style={{}}>
        <Title>All Orders</Title>
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
      </div>
    </React.Fragment>
  );
}
