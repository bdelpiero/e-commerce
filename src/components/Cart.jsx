import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import {
  delProductFromCart,
  completeOrder,
  showCompletedOrders,
  wipeCart,
  addOneItem,
} from "../store/action-creators/cart";

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

function Cart({ productsInCart, cart }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const cartProducts = useSelector((state) => state.cart.productsInCart);
  const cart = useSelector((state) => {
    console.log("ACA ESTA EL ESTADO", state);
    return state.cart.selected;
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">Producto</StyledTableCell>
              <StyledTableCell align="center">Precio unitario</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">Cantidad</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInCart.length !== 0 ? (
              productsInCart.map((product) => (
                <StyledTableRow key={product.product.id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      className="imgSize"
                      src={product.product.imageUrl}
                      style={{ height: "150px", width: "100px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.product.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.product.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">edit</StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={() =>
                        dispatch(addOneItem(cart, product.product, "resta"))
                      }
                    >
                      -
                    </button>
                    {` ${product.total} `}
                    <button
                      onClick={() =>
                        dispatch(addOneItem(cart, product.product, "suma"))
                      }
                    >
                      +
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() =>
                        dispatch(
                          delProductFromCart(product.product, user, cart)
                        )
                      }
                    >
                      <Icon component={DeleteIcon} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <h1>Tu carrito esta vacio.</h1>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary">
          Seguir comprando
        </Button>

        <div className={classes.buttonsLeft}>
          <Button
            variant="contained"
            color="primary"
            className={classes.firstButton}
          >
            Limpiar pedido
          </Button>
          <Link to={`/completed`}>
            <Button
              onClick={() => {
                dispatch(showCompletedOrders());
              }}
              variant="contained"
              color="primary"
              className={classes.firstButton}
            >
              Mis Compras
            </Button>
          </Link>
          <Button
            onClick={() => {
              dispatch(completeOrder(cart));
            }}
            variant="contained"
            color="primary"
          >
            Completar pedido
          </Button>
          <Link to="/products">
            <Button variant="contained" color="primary">
              Seguir comprando
            </Button>
          </Link>
          {productsInCart.length !== 0 ? (
            <div className={classes.buttonsLeft}>
              <Link to="/products">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.firstButton}
                  onClick={() => dispatch(wipeCart(cart))}
                >
                  Vaciar Carrito
                </Button>
              </Link>
              <Button variant="contained" color="primary">
                Realizar pedido
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Cart;
