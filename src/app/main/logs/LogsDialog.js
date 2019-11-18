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

const newContactState = {
  name: '',
  companyId: ''
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

  closeComposeDialog = () => {
    this.props.contactDialog.type === 'edit'
      ? this.props.closeEditContactDialog()
      : this.props.closeNewContactDialog();
  };

  canBeSubmitted() {
    const { name } = this.state;
    return name.length > 0;
  }

  render() {
    const { contactDialog/*, addBrand, updateBrand, removeBrand */} = this.props;

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
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // addBrand(this.state);
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
                // updateBrand(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeBrand(this.state.id);
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
      // addBrand: Actions.addBrand,
      // updateBrand: Actions.updateBrand,
      // removeBrand: Actions.removeBrand
    },
    dispatch
  );
}

function mapStateToProps({ logsApp }) {
  return {
    contactDialog: logsApp.logs.contactDialog,
    companies: logsApp.logs.companies
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);