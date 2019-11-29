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

const newWarrantyClaimState = {
  formName: '',
  companyId: ''
  // id: ''
};

class WarrantyClaimDialog extends Component {
  state = { ...newWarrantyClaimState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.warrantyClaimDialog.props.open &&
      this.props.warrantyClaimDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.warrantyClaimDialog.type === 'edit' &&
        this.props.warrantyClaimDialog.data &&
        !_.isEqual(this.props.warrantyClaimDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyClaimDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.warrantyClaimDialog.type === 'new' &&
        !_.isEqual(newWarrantyClaimState, prevState)
      ) {
        this.setState({ ...newWarrantyClaimState });
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
    this.props.warrantyClaimDialog.type === 'edit'
      ? this.props.closeEditWarrantyClaimDialog()
      : this.props.closeNewWarrantyClaimDialog();
  };

  canBeSubmitted() {
    const { formName } = this.state;
    return formName.length > 0;
  }

  render() {
    const { warrantyClaimDialog, addWarrantyClaim, updateWarrantyClaim, removeWarrantyClaim } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...warrantyClaimDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {warrantyClaimDialog.type === 'new' ? 'New Warranty Claim Form' : 'Edit Warranty Claim Form'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="warrantyClaim avatar"
              src={this.state.avatar}
            /> */}
            {warrantyClaimDialog.type === 'edit' && (
              <Typography variant="h6" color="inherit" className="pt-8">
                {this.state.formName}
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

        {warrantyClaimDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addWarrantyClaim(this.state);
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
                updateWarrantyClaim(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                if (window.confirm('Are you sure to delete '+this.state.formName+' warranty claim?')) {
                  removeWarrantyClaim(this.state.id);
                  this.closeComposeDialog();
                }
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
      closeEditWarrantyClaimDialog: Actions.closeEditWarrantyClaimDialog,
      closeNewWarrantyClaimDialog: Actions.closeNewWarrantyClaimDialog,
      addWarrantyClaim: Actions.addWarrantyClaim,
      updateWarrantyClaim: Actions.updateWarrantyClaim,
      removeWarrantyClaim: Actions.removeWarrantyClaim
    },
    dispatch
  );
}

function mapStateToProps({ warrantyClaimApp }) {
  return {
    warrantyClaimDialog: warrantyClaimApp.warrantyClaim.warrantyClaimDialog,
    companies: warrantyClaimApp.warrantyClaim.companies
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarrantyClaimDialog);
