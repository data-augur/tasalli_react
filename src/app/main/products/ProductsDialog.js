import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const newContactState = {
  code: '',
  product_has_warranty: '',
  brandId: '',
  w_registration_form_Id: '',
  w_completion_form_Id: '',
  w_claim_form_Id: '',
  isOpen: false
  // companyId: ''
  // id: ''
};

class ContactDialog extends Component {
  state = { ...newContactState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.contactDialog.props.open &&
      this.props.contactDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.contactDialog.type === 'edit' &&
        this.props.contactDialog.data &&
        !_.isEqual(this.props.contactDialog.data, prevState)
      ) {
        this.setState({ ...this.props.contactDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.contactDialog.type === 'new' &&
        !_.isEqual(newContactState, prevState)
      ) {
        this.setState({ ...newContactState });
      }
    }
  }

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
  };
  handleCodeChange = event => {

      this.setState(
          _.set(
              { ...this.state },
              event.target.name,
              event.target.type === 'checkbox'
                  ? event.target.checked
                  : event.target.value
          )
      );

  };

  closeComposeDialog = () => {
    this.props.contactDialog.type === 'edit'
      ? this.props.closeEditContactDialog()
      : this.props.closeNewContactDialog();
  };

  canBeSubmitted() {
    const { code } = this.state;
    return code.length > 0;
  };

  openPopup = () => {
    this.setState({
      isOpen: true
    });
  };

  closePopup = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { contactDialog, addProduct, updateProduct, removeProduct } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...contactDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {contactDialog.type === 'new' ? 'New Company' : 'Edit Company'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="contact avatar"
              src={this.state.avatar}
            /> */}
            {contactDialog.type === 'edit' && (
              <Typography variant="h6" color="inherit" className="pt-8">
                {this.state.code}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Code"
              autoFocus
              id="code"
              name="code"
              value={this.state.code}
              onChange={this.handleCodeChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>


          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <FormControl component="fieldset">
              <FormLabel component="legend">Warranty</FormLabel>
              <RadioGroup aria-label="warranty" name="product_has_warranty" value={this.state.product_has_warranty} onChange={this.handleChange} row>
                <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label="No"
                    labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>

          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
                className="mb-24"
                label="Registration Form"
                id="w_registration_form_Id"
                name="w_registration_form_Id"
                select
                value={this.state.w_registration_form_Id}
                onChange={this.handleChange}
                // defaultValue="Brand Admin"
                // onChange={handleChange('currency')}
                // helperText="Please select "
                margin="normal"
                fullWidth
                variant="outlined"
            >
              {this.props.registrationForms.map(option => {

                return (
                    <option key={option.id} value={option.id}>
                      {option.formName}
                    </option>
                );
              })}
            </TextField>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
                className="mb-24"
                label="Completion Form"
                id="w_completion_form_Id"
                name="w_completion_form_Id"
                select
                value={this.state.w_completion_form_Id}
                onChange={this.handleChange}
                // defaultValue="Brand Admin"
                // onChange={handleChange('currency')}
                // helperText="Please select "
                margin="normal"
                fullWidth
                variant="outlined"
            >
              {this.props.completionForms.map(option => {

                return (
                    <option key={option.id} value={option.id}>
                      {option.formName}
                    </option>
                );
              })}
            </TextField>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
                className="mb-24"
                label="Claim Form"
                id="w_claim_form_Id"
                name="w_claim_form_Id"
                select
                value={this.state.w_claim_form_Id}
                onChange={this.handleChange}
                // defaultValue="Brand Admin"
                // onChange={handleChange('currency')}
                // helperText="Please select "
                margin="normal"
                fullWidth
                variant="outlined"
            >
              {this.props.claimForms.map(option => {

                return (
                    <option key={option.id} value={option.id}>
                      {option.formName}
                    </option>
                );
              })}
            </TextField>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
                className="mb-24"
                label="Brand"
                id="brandId"
                name="brandId"
                select
                value={this.state.brandId}
                onChange={this.handleChange}
                // defaultValue="Brand Admin"
                // onChange={handleChange('currency')}
                // helperText="Please select "
                margin="normal"
                fullWidth
                variant="outlined"
            >
              {this.props.brands.map(option => {

                return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                );
              })}
            </TextField>
          </div>

        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addProduct(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                updateProduct(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeProduct(this.state.id);
                this.closeComposeDialog();
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditContactDialog: Actions.closeEditContactDialog,
      closeNewContactDialog: Actions.closeNewContactDialog,
      addProduct: Actions.addProduct,
      updateProduct: Actions.updateProduct,
      removeProduct: Actions.removeProduct
    },
    dispatch
  );
}

function mapStateToProps({ productsApp }) {
  return {
    contactDialog: productsApp.products.contactDialog,
    registrationForms: productsApp.products.registrationForms,
    completionForms: productsApp.products.completionForms,
    claimForms: productsApp.products.claimForms,
    brands: productsApp.products.brands
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);
