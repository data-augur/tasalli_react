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

const newWarrantyRegistrationState = {
  formName: '',
  companyId: ''
  // id: ''
};

class WarrantyRegistrationDialog extends Component {
  state = { ...newWarrantyRegistrationState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.warrantyRegistrationDialog.props.open &&
      this.props.warrantyRegistrationDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.warrantyRegistrationDialog.type === 'edit' &&
        this.props.warrantyRegistrationDialog.data &&
        !_.isEqual(this.props.warrantyRegistrationDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyRegistrationDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.warrantyRegistrationDialog.type === 'new' &&
        !_.isEqual(newWarrantyRegistrationState, prevState)
      ) {
        this.setState({ ...newWarrantyRegistrationState });
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
    this.props.warrantyRegistrationDialog.type === 'edit'
      ? this.props.closeEditWarrantyRegistrationDialog()
      : this.props.closeNewWarrantyRegistrationDialog();
  };

  canBeSubmitted() {
    const { formName } = this.state;
    return formName.length > 0;
  }

  render() {
    const { warrantyRegistrationDialog, addWarrantyRegistration, updateWarrantyRegistration, removeWarrantyRegistration } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...warrantyRegistrationDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {warrantyRegistrationDialog.type === 'new' ? 'New Warranty Registration' : 'Edit Warranty Registration'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="warrantyRegistration avatar"
              src={this.state.avatar}
            /> */}
            {warrantyRegistrationDialog.type === 'edit' && (
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
              id="formName"
              name="formName"
              value={this.state.formName}
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

        {warrantyRegistrationDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addWarrantyRegistration(this.state);
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
                updateWarrantyRegistration(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeWarrantyRegistration(this.state.id);
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
      closeEditWarrantyRegistrationDialog: Actions.closeEditWarrantyRegistrationDialog,
      closeNewWarrantyRegistrationDialog: Actions.closeNewWarrantyRegistrationDialog,
      addWarrantyRegistration: Actions.addWarrantyRegistration,
      updateWarrantyRegistration: Actions.updateWarrantyRegistration,
      removeWarrantyRegistration: Actions.removeWarrantyRegistration
    },
    dispatch
  );
}

function mapStateToProps({ warrantyRegistrationApp }) {
  return {
    warrantyRegistrationDialog: warrantyRegistrationApp.warrantyRegistration.warrantyRegistrationDialog,
    companies: warrantyRegistrationApp.warrantyRegistration.companies
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarrantyRegistrationDialog);
