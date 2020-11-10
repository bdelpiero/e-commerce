import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  buttons: {
    margin: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  firstButton: {
    marginRight: 20,
  },
});

function CompletedOrders() {
  const user = useSelector((state) => state.login.loggedUser);
  const completedOrders = useSelector((state) => {
    console.log("ACA ESTA EL ESTADO", state);
    return state.orders.completedOrders;
  });
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Orden Nº</StyledTableCell>
              <StyledTableCell align="center">Precio unitario</StyledTableCell>
              <StyledTableCell align="right">Fecha</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedOrders.map((orden) => {
              return (
                <StyledTableRow key={orden.id}>
                  <StyledTableCell align="left">{orden.id}</StyledTableCell>
                  <StyledTableCell align="center">PRECIO</StyledTableCell>
                  <StyledTableCell align="right">
                    {orden.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>Ver más</Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompletedOrders;
