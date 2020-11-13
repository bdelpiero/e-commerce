import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../styles/singleProductStyle.css";
import SingleProductInfo from "./SingleProductInfo";
import SingleProductReviews from "./SingleProductReviews";
import AddReview from "./AddReview";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

function SingleProduct({ product, reviews, path, url, setReviews, user }) {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.login.loggedUser);
  const classes = useStyles();

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className='container'>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='secondary'
            textColor='secondary'>
            <Tab
              label='Info'
              value='one'
              {...a11yProps("one")}
              component={Link}
              to={`${url}/info`}
            />
            <Tab
              label='Reviews'
              value='twoe'
              {...a11yProps("one")}
              component={Link}
              to={`${url}/reviews`}
            />
          </Tabs>
        </AppBar>
        <div role='tabpanel'>
          <Route
            exact
            path={`${path}`}
            render={() => (
              <SingleProductInfo product={product} reviews={reviews} />
            )}
          />
          <Route
            exact
            path={`${path}/info`}
            render={() => (
              <SingleProductInfo product={product} reviews={reviews} />
            )}
          />
          <Route
            exact
            path={`${path}/reviews`}
            render={() => <SingleProductReviews reviews={reviews} />}
          />
        </div>
      </div>
      {user.id && (
        <Route
          exact
          path={`${path}/reviews`}
          render={() => (
            <AddReview
              productId={product.id}
              setReviews={setReviews}
              user={user}
              reviews={reviews}
            />
          )}
        />
      )}
    </div>
  );
}

export default SingleProduct;
