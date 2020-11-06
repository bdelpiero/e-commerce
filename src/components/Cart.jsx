import React from "react";
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

function Cart({ productsInCart }) {
  const classes = useStyles();
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
            {productsInCart.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component='th' scope='row'>
                  <img
                    className='imgSize'
                    src={product.imageUrl}
                    style={{ height: "150px", width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align='left'>{product.title}</StyledTableCell>
                <StyledTableCell align='center'>
                  {product.price}
                </StyledTableCell>
                <StyledTableCell align='right'>edit</StyledTableCell>
                <StyledTableCell align='right'>1</StyledTableCell>
                <StyledTableCell align='right'>
                  <Icon component={DeleteIcon} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button variant='contained' color='primary'>
          Seguir comprando
        </Button>
        <div className={classes.buttonsLeft}>
          <Button
            variant='contained'
            color='primary'
            className={classes.firstButton}>
            Limpia pedido
          </Button>
          <Button variant='contained' color='primary'>
            Realizar pedido
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
