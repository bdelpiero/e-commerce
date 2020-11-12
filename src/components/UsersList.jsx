import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
// import { DataGrid } from "@material-ui/data-grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function DenseTable({ users }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='center'>email</TableCell>
            <TableCell align='center'>address</TableCell>
            <TableCell align='right'>role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component='th' scope='row'>
                {user.id}
              </TableCell>
              <TableCell align='center'>{user.email}</TableCell>
              {/* <TableCell align='right'>{user.id}</TableCell> */}
              <TableCell align='right'>{user.adress}</TableCell>
              <TableCell align='right'>{user.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// export default function VirtualizedList({users}) {
//   const classes = useStyles();
//   let count = 0
//   function renderRow(props) {

//     const { index, style } = props;
//     count++

//     return (
//       <div>
//       {users.map((user,i)=>(
//         count == users.length?
//     <ListItem button key={i}>
//       <ListItemText primary={`${i+1} | ${user.email} | ${user.rol}`} />
//     </ListItem>
//     :null
//   ))}
//   </div>
//   )

//   }

//   renderRow.propTypes = {
//     index: PropTypes.number.isRequired,
//     style: PropTypes.object.isRequired,
//   };

//   return (
//     <div >
//     <Typography variant="h6" className={classes.position}>Usuarios</Typography>
//     <div className={classes.root}>
//       <FixedSizeList height={400} width={300} itemSize={46} itemCount={users.length}>
//         {renderRow}
//       </FixedSizeList>
//       </div>
//     </div>
//   );
// }
