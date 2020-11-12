import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function AddressForm({handleInputChange, data}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            value={data.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            value={data.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            required
            id="address"
            name="address"
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            value={data.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="shipping address-level2"
            value={data.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            required
            id="postalCode"
            name="postalCode"
            label="Codigo postal"
            fullWidth
            autoComplete="shipping postal-code"
            value={data.postalCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}