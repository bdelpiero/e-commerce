import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

function CompletedOrderDetails({
  completedOrdersProduct,
  showCompletedHandler,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const cartProducts = useSelector((state) => state.cart.productsInCart);
  const order = useSelector((state) => {
    // console.log("ACA ESTA EL ESTADO", state);
    return state.cart.selected;
  });
  const history = useHistory();
  let total = 0;
  const updateTotal = (product) => {
    const subtotal = product.product.price.substring(1) * product.total;
    total += subtotal;
    return subtotal;
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='left'>Producto</StyledTableCell>
              <StyledTableCell align='center'>Precio unitario</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'>Cantidad</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedOrdersProduct.map((product) => (
              <StyledTableRow key={product.product.id}>
                <StyledTableCell component='th' scope='row'>
                  <img
                    className='imgSize'
                    src={product.product.imageUrl}
                    style={{ height: "150px", width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {product.product.title}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {`$ ${updateTotal(product)}`}
                </StyledTableCell>
                <StyledTableCell align='right'>edit</StyledTableCell>
                <StyledTableCell align='right'>{product.total}</StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='left'>Total:</StyledTableCell>
              <StyledTableCell align='center'>{`$ ${total}`}</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Link to={`/completed`}>
          <Button
            onClick={() => {
              showCompletedHandler();
            }}
            variant='contained'
            color='primary'
            className={classes.firstButton}>
            Mis Compras
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CompletedOrderDetails;
