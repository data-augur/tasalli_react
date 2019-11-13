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
import jwt_decode from 'jwt-decode';

const adminsRole = [
  {
    value: 'tasaliAdmin',
    label: 'Tasali Admin'
  },
  {
    value: 'superAdmin',
    label: 'Super Admin'
  }
];
const newContactState = {
  password: '',
  email: '',
  role: ''
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
      email,
      role
    } = this.state;

    return (
        email.length > 0 &&
        role.length > 0
    );
  }

  render() {
    const {
      contactDialog,
      addAdminUser,
      updateAdminUser,
      removeAdminUser
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
                    ? 'New Admin User'
                    : 'Edit Admin User'}
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
                <Icon color="action">work</Icon>
              </div>
              <TextField
                  className="mb-24"
                  label="Role"
                  id="role"
                  name="role"
                  select
                  value={this.state.role}
                  onChange={this.handleChange}
                  // defaultValue="Tasali Admin"
                  // onChange={handleChange('currency')}
                  // helperText="Please select "
                  margin="normal"
                  fullWidth
                  variant="outlined"
              >
                {adminsRole.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                ))}
              </TextField>
            </div>

          </DialogContent>

          {contactDialog.type === 'new' ? (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addAdminUser(this.state);
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
                      updateAdminUser(this.state);
                      this.closeComposeDialog();
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Save
                </Button>
                <IconButton
                    onClick={() => {
                      removeAdminUser(this.state.id);
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
        addAdminUser: Actions.addAdminUser,
        updateAdminUser: Actions.updateAdminUser,
        removeAdminUser: Actions.removeAdminUser,
        getAllAdmins: Actions.getAllAdminUsers
      },
      dispatch
  );
}

function mapStateToProps({ adminUserApp }) {
  return {
    contactDialog: adminUserApp.adminUser.contactDialog,
    // brands: brandUserApp.brandUser.brands,
    // companies: brandUserApp.brandUser.companies,
    // login: brandUserApp.login,
    // user: brandUserApp.user
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDialog);