import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../styles/singleProductStyle.css";
import SingleProductInfo from "./SingleProductInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SingleProduct({ product, reviews }) {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.login.loggedUser);
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("reviews en singleProduct: ", reviews);
  return (
    <div className={classes.root}>
      <div className='container'>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'>
            <Tab label='Info' />
            <Tab label='Reviews' />
          </Tabs>
        </AppBar>
        <div role='tabpanel'>
          <SingleProductInfo product={product} reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;

{
  /* <div>
<div>
    
</div>
<div>
    <h1>{product.title}</h1>
    <h2>{product.author}</h2>
    <h3>{product.description}</h3>
    <h3>{product.price}</h3>
    <p>{product.stock}</p>
</div>
</div> */
}

{
  /* <Link to="/user/cart/6">
                    <AddShoppingCartIcon />
                  </Link>

<IconButton aria-label="show 4 new mails" color="inherit">
<Badge badgeContent={4} color="secondary">
  <Link to="/user/cart/6">
    <AddShoppingCartIcon />
  </Link>
</Badge>
</IconButton> */
}
