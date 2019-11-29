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
const newAppuserState = {
  name: '',
  gender: '',
  address: '',
  cnic: '',
  city: ''
};

class AppuserDialog extends Component {
  state = { ...newAppuserState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.appuserDialog.props.open &&
      this.props.appuserDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.appuserDialog.type === 'edit' &&
        this.props.appuserDialog.data &&
        !_.isEqual(this.props.appuserDialog.data, prevState)
      ) {
        this.setState({ ...this.props.appuserDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.appuserDialog.type === 'new' &&
        !_.isEqual(newAppuserState, prevState)
      ) {
        this.setState({ ...newAppuserState });
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
    this.props.appuserDialog.type === 'edit'
      ? this.props.closeEditAppuserDialog()
      : this.props.closeNewAppuserDialog();
  };

  canBeSubmitted() {
    return true;
  }

  render() {
    const { appuserDialog, updateAppUser, removeAppUser } = this.props;
    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...appuserDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {appuserDialog.type === 'new'
                ? 'New App User'
                : 'Edit App User'}
            </Typography>
          </Toolbar>
          <div className="flex flex-c`ol items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="appuser avatar"
              src={this.state.avatar}
            /> */}
            {appuserDialog.type === 'edit' && (
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
              hidden={localStorage.getItem('Role')!=='superAdmin'}
              disabled= {localStorage.getItem('Role')!=='superAdmin'}
            onClick={() => {
              if (window.confirm('Are you sure to delete '+this.state.name+' App user?')) {
                removeAppUser(this.state.id);
                this.closeComposeDialog();
              }
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
      closeEditAppuserDialog: Actions.closeEditAppuserDialog,
      closeNewAppuserDialog: Actions.closeNewAppuserDialog,
      updateAppUser: Actions.updateAppUser,
      removeAppUser: Actions.removeAppUser
    },
    dispatch
  );
}

function mapStateToProps({ appUserApp }) {
  return {
    appuserDialog: appUserApp.appUser.appuserDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppuserDialog);
