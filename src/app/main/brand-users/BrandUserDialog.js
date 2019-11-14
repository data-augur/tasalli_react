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

const brandAdmins = [
  {
    value: 'companyAdmin',
    label: 'Company Admin'
  },
  {
    value: 'brandAdmin',
    label: 'Brand Admin'
  },
  {
    value: 'brandSupplier',
    label: 'Brand Supplier'
  }
];
const gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];
const newContactState = {
  name: '',
  password: '',
  email: '',
  brandId: null,
  role: '',
  phoneNumber: '',
  address: '',
  gender: '',
  companyId: null
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

  closeComposeDialog = () => {
    this.props.contactDialog.type === 'edit'
      ? this.props.closeEditContactDialog()
      : this.props.closeNewContactDialog();
  };

  canBeSubmitted() {
    const {
      name,
      email,
      role,
      gender
    } = this.state;

    return (
      name.length > 0 &&
      email.length > 0 &&
      // password.length > 0 &&
      //   brandId.length > 0 &&
      gender.length > 0 &&
      role.length > 0
    );
  }

  render() {
    const {
      contactDialog,
      addBrandUser,
      updateBrandUser,
      removeBrandUser
    } = this.props;
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
              {contactDialog.type === 'new'
                ? 'New Brand User'
                : 'Edit Brand User'}
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
                {this.state.name}
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
              label="Name"
              autoFocus
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>

          {contactDialog.type === 'new' ? (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">lock</Icon>
              </div>

              <TextField
                className="mb-24"
                label="Password"
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </div>
          ) : null}

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Phone"
              id="phoneNumber"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
                className="mb-24"
                label="Job Title"
                id="role"
                name="role"
                select
                value={this.state.role}
                onChange={this.handleChange}
                defaultValue="Brand Admin"
                // onChange={handleChange('currency')}
                // helperText="Please select "
                margin="normal"
                fullWidth
                variant="outlined"
            >
              {brandAdmins.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </TextField>
          </div>

          {this.state.role==='companyAdmin' ? (
           <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Select Company"
              id="companyId"
              name="companyId"
              select
              value={this.state.companyId}
              onChange={this.handleChange}
              // defaultValue="Brand Admin"
              // onChange={handleChange('currency')}
              // helperText="Please select "
              margin="normal"
              fullWidth
              variant="outlined"
            >
              {this.props.companies.map(option => {

                return (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                );
              })}
            </TextField>
          </div>
          ) : null}

          {this.state.role==='brandAdmin'||this.state.role==='brandSupplier' ? (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">work</Icon>
              </div>
              <TextField
                className="mb-24"
                label="Select Brand"
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
          ) : null}

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">person</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Gender"
              id="gender"
              name="gender"
              select
              value={this.state.gender}
              onChange={this.handleChange}
              // onChange={handleChange('currency')}
              // helperText="Please select "
              margin="normal"
              fullWidth
              variant="outlined"
            >
              {gender.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Address"
              id="address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          {/* <div className="flex">
                    <div className="min-w-48 pt-20">
                            <Icon color="action">person</Icon>
                        </div>
                    
                        <TextField
                            className="mb-24"
                            label="Gender"
                            id="gender"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div> */}
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if(this.state.role==='brandAdmin'||this.state.role==='brandSupplier')
                {
                  this.state.companyId= null;//=null;
                }
                else if(this.state.role==='companyAdmin')
                {
                  this.state.brandId= null;
                  //  this.state.companyId= decoded.companyId;
                }
                addBrandUser(this.state);
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
                delete this.state.password;
                updateBrandUser(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeBrandUser(this.state.id);
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
      addBrandUser: Actions.addBrandUser,
      updateBrandUser: Actions.updateBrandUser,
      removeBrandUser: Actions.removeBrandUser,
      getAllBrands: Actions.getAllBrands
    },
    dispatch
  );
}

function mapStateToProps({ brandUserApp }) {
  return {
    contactDialog: brandUserApp.brandUser.contactDialog,
    brands: brandUserApp.brandUser.brands,
    companies: brandUserApp.brandUser.companies,
    login: brandUserApp.login,
    user: brandUserApp.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);
