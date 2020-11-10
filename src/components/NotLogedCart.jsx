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
import {fetchProducts} from "../store/action-creators/products"
import { delProductFromCart, wipeCart } from "../store/action-creators/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
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



function NotLogedCart({ productsInCart, cart }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loggedUser);
  const products = useSelector((state) => state.products.list);

  const addOrRemoveItem = (product, op) => {
    if(op === "suma"){
      product.total = product.total + 1;
    }else {
      product.total = product.total - 1;
    }
    localStorage.setItem(`${product.id}`, JSON.stringify(product))
    axios.put(`http://localhost:1337/api/orders/newOrder/product/${product.id}`, {op})
    .then(()=> dispatch(fetchProducts()))
  }
  
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
            {productsInCart.length !== 0 ? productsInCart.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    className="imgSize"
                    src={product.imageUrl}
                    style={{ height: "150px", width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{product.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {product.price}
                </StyledTableCell>
                <StyledTableCell align="right">edit</StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={()=> addOrRemoveItem(product, "resta")}
                  >
                    -
                  </button>
                  {` ${product.total} `} 
                  <button onClick={()=> addOrRemoveItem(product, "suma")}>
                    +
                  </button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() =>
                      dispatch(delProductFromCart(product.product, user, cart))
                    }
                  >
                    <Icon component={DeleteIcon} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )): <h1 >Tu carrito esta vacio.</h1>}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Link to="/products">
          <Button variant="contained" color="primary">
            Seguir comprando
          </Button>
        </Link> 
        {productsInCart.length !== 0 ?
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
          : null
        }
        
      </div>
    </div>
  );
}

export default NotLogedCart;