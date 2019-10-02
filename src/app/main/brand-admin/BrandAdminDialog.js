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
  AppBar,
  Avatar
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from '@lodash';
const brandAdmins = [
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
  brandId: '',
  role: '',
  phoneNumber: '',
  address: '',
  gender: ''
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
    const { name, email, password, brandId, role, gender } = this.state;
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      //   brandId.length > 0 &&
      gender.length > 0 &&
      role.length > 0
    );
  }
  // const { name, email, password, brandId, role } = this.state;
  // if (
  //   name.length > 0 &&
  //   email.length > 0 &&
  //   password.length > 0 &&
  //   brandId.isInteger &&
  //   role.length > 0
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
  render() {
    const {
      contactDialog,
      addContact,
      updateContact,
      removeContact
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
            <Avatar
              className="w-96 h-96"
              alt="contact avatar"
              src={this.state.avatar}
            />
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
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">lock</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
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
              <Icon color="action">domain</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Brand"
              id="brandId"
              name="brandId"
              value={this.state.brandId}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          {/* <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="job Title"
                            id="role"
                            name="role"
                            value={this.state.role}
                            onChange={this.handleChange}
                            variant="outlined"
                            helperText="brandAdmin/brandSupplier"
                            fullWidth
                            required
                        />
                    </div> */}

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
              className="mb-24"
              label="job Title"
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
                addContact(this.state);
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
                updateContact(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeContact(this.state.id);
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
      addContact: Actions.addContact,
      updateContact: Actions.updateContact,
      removeContact: Actions.removeContact
    },
    dispatch
  );
}

function mapStateToProps({ contactsApp }) {
  return {
    contactDialog: contactsApp.contacts.contactDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);
