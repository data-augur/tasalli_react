import React, { Component } from 'react';
import axios from 'axios';
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
  gender: '',
  address: '',
  cnic: '',
  city: ''
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
    return true;
  }

  render() {
    const { contactDialog, updateAppUser, removeAppUser } = this.props;
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
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">person</Icon>
            </div>
            <TextField
              className="mb-24"
              label="CNIC"
              id="cnic"
              name="cnic"
              value={this.state.cnic}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <TextField
              className="mb-24"
              label="City"
              id="city"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              delete this.state.password;
              updateAppUser(this.state);
              this.closeComposeDialog();
            }}
            disabled={!this.canBeSubmitted()}
          >
            Save
          </Button>
          <IconButton
            onClick={() => {
              removeAppUser(this.state.id);
              this.closeComposeDialog();
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditContactDialog: Actions.closeEditContactDialog,
      closeNewContactDialog: Actions.closeNewContactDialog,
      updateAppUser: Actions.updateAppUser,
      removeAppUser: Actions.removeAppUser
    },
    dispatch
  );
}

function mapStateToProps({ appUserApp }) {
  return {
    contactDialog: appUserApp.appUser.contactDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);
