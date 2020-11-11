import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm({handleInputChange, data}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
          onChange={handleInputChange}
          required id="cardName"
          name="cardName" 
          label="Titular de la tarjeta" 
          fullWidth autoComplete="cc-name" 
          value={data.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="cardNumber"
            name="cardNumber"
            label="Numero de tarjeta"
            fullWidth
            autoComplete="cc-number"
            value={data.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          onChange={handleInputChange}
          required id="expDate" 
          name="expDate"
          label="Fecha de vencimiento" 
          fullWidth autoComplete="cc-exp" 
          value={data.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            value={data.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}