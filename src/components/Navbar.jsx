import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import useStyles from "../styles/NavbarStyle";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchIsLogged, loggUser, login } from "../store/action-creators/login";
import { searchProduct } from "../store/action-creators/products"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});



function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const logged = useSelector((state) => {
    return state.login.loggedUser.id;
  });
  const user = useSelector((state) => {
    return state.login.loggedUser;
  });
  // const islogged = useSelector((state) => {
  //   return state.login.logged;
  // });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 const [searchInput, setSearchInput] = useState("");

 const [searchResults, setSearchResults] = useState([]);


const handleSubmit = (event) => {
  event.preventDefault();
  // history.push({pathname:"/products/busqueda/", search: `?search=${event.target[0].value}`});
  // event.target[0].value= " ";
  dispatch(searchProduct(searchInput.trim()))
  .then(() => {
  history.push("/search");
  })

};


  const handleLogout = () => {
    console.log("logout attempt...");

    axios
      .post("http://localhost:1337/api/user/logout")
      .then((res) => res.data)
      .then(() => dispatch(loggUser({})))
      .then(() => dispatch(login(false)))
      .then(() => history.push("/"));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {user.rol == "admin" ? (
        <Link to="/configs" className={classes.noneTwo}>
          <MenuItem onClick={handleMenuClose}>Admin settings</MenuItem>
        </Link>
      ) : (
        <MenuItem onClick={handleMenuClose}>settings</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={""} color='secondary'> */}
          <Badge color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          {/* <Badge badgeContent={""} color='secondary'> */}
          <Badge color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" className={classes.none}>
                {" "}
                Bookstore
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={handleSubmit}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={searchInput}
                  // onSubmit={handleSubmit}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {logged ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  className={classes.none}
                  title="register"
                >
                  Logout
                </Button>
              ) : (
                <div>
                  <Link to="/login" className={classes.noneTwo}>
                    <Button
                      color="inherit"
                      className={classes.none}
                      title="login"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className={classes.noneTwo}>
                    <Button
                      color="inherit"
                      className={classes.none}
                      title="register"
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
              <IconButton aria-label="show 4 new mails" color="inherit">
                {/* <Badge badgeContent={""} color='secondary'> */}
                <Badge color="secondary">
                  <Link to="/cart">
                    <AddShoppingCartIcon />
                  </Link>
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                {/* <Badge badgeContent={""} color='secondary'> */}
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </ThemeProvider>
  );
}

export default Navbar;



 