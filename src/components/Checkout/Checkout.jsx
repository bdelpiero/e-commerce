import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {completeOrder} from "../../store/action-creators/cart"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, handleInputChange, data, total, products) {
  switch (step) {
    case 0:
      return <AddressForm handleInputChange={handleInputChange} data={data}/>;
    case 1:
      return <PaymentForm handleInputChange={handleInputChange} data={data}/>;
    case 2:
      return <Review data={data} total={total} products={products}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

  const total = useSelector(state => state.orders.total)
  const products = useSelector(state => state.orders.completedOrdersProduct)
  const dispatch = useDispatch()

  const [data, setData] = React.useState({
    firstName: "",
    lastName:"",
    address: "",
    city: "",
    postalCode: "",
    cardName:"",
    cardNumber: "",
    cvv:"",
    expDate:"",
  })
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleInputChange = evt => {
    return setData({...data, [evt.target.name]:evt.target.value})
  }

  // const completeOrderHandler = (evt) => {
  //   evt.preventDefault()
  //   console.log("EL INNER TEXT", evt.target.innerText)
  //   if(evt.target.innerText !== "Completar pedido") return;
  //   dispatch(completeOrder(total, data));
  // };

  const handleNext = (evt) => {
    setActiveStep(activeStep + 1);
    evt.preventDefault()
    console.log("EL INNER TEXT", evt.target.innerText)
    if(evt.target.innerText !== "COMPLETAR PEDIDO") return;
    console.log("pasooooo")
    dispatch(completeOrder(total, data));
  };

  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout} >
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleInputChange, data, total, products)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Completar pedido' : 'Siguiente'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

