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

import {
  delProductFromCart,
  completeOrder,
  wipeCart,
  addOneItem,
} from "../store/action-creators/cart";

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
  buttonsContainerLeft: {
    display: "flex",
  },
});

function Cart({
  productsInCart,
  cart,
  // showCompletedHandler,
  checkoutOrder,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const cartProducts = useSelector((state) => state.cart.productsInCart);
  const order = useSelector((state) => {
    return state.cart.selected;
  });
  const history = useHistory();
  let subtotal = 0;
  let total = 0;
  const updateTotal = (product) => {
    const subtotal = product.product.price.substring(1) * product.total;
    total += subtotal;
    return subtotal;
  };
  return (
    <div style={{ margin: "100px 50px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table '>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='left'>Producto</StyledTableCell>
              <StyledTableCell align='center'>Precio unitario</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'>Cantidad</StyledTableCell>
              <StyledTableCell align='right'>Subtotal</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInCart.length !== 0 && productsInCart[0].product ? (
              productsInCart.map((product) => {
                return (
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
                      {product.product.price}
                    </StyledTableCell>
                    <StyledTableCell align='right'>edit</StyledTableCell>
                    <StyledTableCell align='right'>
                      {product.total === 0 ? null : (
                        <button
                          onClick={() =>
                            dispatch(addOneItem(cart, product.product, "resta"))
                          }>
                          -
                        </button>
                      )}

                      {` ${product.total} `}
                      {product.product.stock === 0 ? null : (
                        <button
                          onClick={() =>
                            dispatch(addOneItem(cart, product.product, "suma"))
                          }>
                          +
                        </button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {updateTotal(product)}
                    </StyledTableCell>

                    <StyledTableCell align='right'>
                      <Button
                        onClick={() =>
                          dispatch(
                            delProductFromCart(product.product, user, cart)
                          )
                        }>
                        <Icon component={DeleteIcon} />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <h1>Tu carrito esta vacio.</h1>
            )}
          </TableBody>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align='center'></StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'>Total</StyledTableCell>
              <StyledTableCell align='right'>{`$ ${total}`}</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Link to='/products'>
          <Button variant='contained' color='primary'>
            Seguir comprando
          </Button>
        </Link>

        <div className={classes.buttonsContainerLeft}>
          {/* <Link to={`/completed`}>
            <Button
              onClick={() => {
                showCompletedHandler();
              }}
              variant="contained"
              color="primary"
              className={classes.firstButton}
            >
              Mis Compras
            </Button>
          </Link> */}
          <Button
            onClick={() => {
              checkoutOrder(total);
            }}
            variant='contained'
            color='primary'>
            Completar pedido
          </Button>
          {/* <Link to='/products'>
            <Button variant='contained' color='primary'>
              Seguir comprando
            </Button>
          </Link> */}
          {productsInCart.length !== 0 ? (
            <div className={classes.buttonsLeft} style={{ marginLeft: 15 }}>
              <Link to='/products'>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.firstButton}
                  onClick={() => dispatch(wipeCart(cart))}>
                  Vaciar Carrito
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Cart;
