import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../styles/ProductsStyle.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(5),
  },
  sizes: {
    height: 275,
    width: 200,
  },
  cardroot: {
    maxWidth: 345,
  },
  media: {
    height: 275,
    width: 200,
  },
  cardinfo: {
    height: 50,
  },
  titletypo: {
    fontSize: 20,
    textAlign: "center",
  },
  authortypo: {
    textAlign: "center",
  },
  pricetypo: {
    textAlign: "center",
    marginTop: 7,
    color: "red",
    fontWeight: "bold",
  },
  content: {
    maxWidth: 200,
  },
  d: {
    position: "relative",
  },
}));

//------------------------------------------------------------------------------
function RemoveProducts({ products, handleRemove, setProducts }) {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(5);

  return (
    <div
      className='absoluteTwo'
      style={{ position: "absolute", left: "300px" }}>
      <Grid item xs={12} style={{ marginTop: "50px" }}>
        <Grid
          container
          justify='center'
          spacing={spacing}
          style={{ marginTop: "50px" }}>
          {products.length != 0 &&
            products.map((product) => (
              <Grid key={product.id} item>
                <Card className={classes.cardroot}>
                  <CardActionArea>
                    <Link to={`/products/${product.id}`}>
                      <CardMedia
                        className={classes.media}
                        image={product.imageUrl}
                        title='Contemplative Reptile'
                      />
                    </Link>
                  </CardActionArea>
                </Card>
                <CardContent className={classes.content}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='h2'
                    className={classes.titletypo}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.authortypo}>
                    <span>by: {product.author}</span>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.pricetypo}>
                    <span> {product.price}</span>
                  </Typography>

                  <Badge className='link' color='secondary'>
                    <AlertDialog id={product.id} setProducts={setProducts} />
                    <FormDialog
                      product={product}
                      id={product.id}
                      setProducts={setProducts}
                    />
                  </Badge>
                </CardContent>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

//------------------------------------------------------------------------------
function AlertDialog({ id, setProducts }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (e) => {
    console.log(id);
    axios
      .delete(`http://localhost:1337/api/products/${id}`)
      .then(() =>
        axios
          .get("http://localhost:1337/api/products")
          .then((res) => res.data)
          .then((products) => {
            console.log("products después de remove: ", products);
            return products;
          })
          .then((products) => setProducts([...products]))
          .catch((err) => console.log(err))
      )
      .then(() => setOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        <DeleteForeverIcon /> delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            if you delete this product it will be deleted permanently from our
            database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleRemove} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
//------------------------------------------------------------------------------
function FormDialog({ id, product, setProducts }) {
  console.log(product);
  //const [product,setProduct] = useState({})

  /*useEffect(()=>{
  axios.get(`http://localhost:1337/api/products/${id}`)
       .then(res => res.data)
       .then(data => setProduct([data]))
       .then(()=> console.log(product))
       .catch(err=> console.log(err))
},[])*/

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [author, setAuthoer] = useState(product.author);
  const [isbn, setIsbn] = useState(product.ISBN);
  const [publisher, setPublisher] = useState(product.publisher);
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [stock, setStock] = useState(product.stock);
  const [amount, setAmount] = useState(product.price.substring(1));
  // const [category, setCategory] = useState(
  //   product.categories.length != 0 && product.categories[0].name
  // );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    if (name == "title") setTitle(e.target.value);
    if (name == "author") setAuthoer(e.target.value);
    if (name == "isbn") setIsbn(e.target.value);
    if (name == "publisher") setPublisher(e.target.value);
    if (name == "description") setDescription(e.target.value);
    if (name == "imageUrl") setImageUrl(e.target.value);
    if (name == "stock") setStock(e.target.value);
    if (name == "price") setAmount(e.target.value);
    // if (name == "category") setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("submit attempt");
    axios
      .put(`http://localhost:1337/api/products/${id}`, {
        title: title,
        price: amount,
        description: description,
        stock: stock,
        imageUrl: imageUrl,
        ISBN: isbn,
        author: author,
        publisher: publisher,
        // category: category,
      })
      .then((res) => res.data)
      .then(() =>
        axios
          .get("http://localhost:1337/api/products")
          .then((res) => res.data)
          .then((products) => setProducts([...products]))
          .catch((err) => console.log(err))
      )
      .then(() => setOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        <EditIcon />
        edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <EditIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='title'
            label='Title'
            type='text'
            value={title}
          />
          <TextField
            autoFocus
            margin='dense'
            name='author'
            label='Author'
            type='text'
            onChange={handleChange}
            value={author}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='isbn'
            label='ISBN'
            type='text'
            value={isbn}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='publisher'
            label='Publisher'
            type='text'
            value={publisher}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='description'
            label='Description'
            type='text'
            value={description}
            fullWidth
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='imageUrl'
            label='ImageUrl'
            type='text'
            value={imageUrl}
            fullWidth
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='stock'
            label='Stock'
            value={stock}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='price'
            label='Amount'
            value={amount}
          />
          {/* <TextField
            onChange={handleChange}
            autoFocus
            margin='dense'
            name='category'
            label='Category'
            value={category}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveProducts;
