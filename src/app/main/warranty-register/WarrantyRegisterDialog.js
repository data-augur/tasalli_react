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
  code: '',
  phoneNumber: '',
  date: '',
  id: '',
  details: []
};

class ContactDialog extends Component {
  state = { ...newContactState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    // this.state.detail=this.state.details;

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



  closeComposeDialog = () => {
    this.props.contactDialog.type === 'edit'
      ? this.props.closeEditContactDialog()
      : this.props.closeNewContactDialog();
  };

  render() {
    const { contactDialog, removeWarrantyRegister } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...contactDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {contactDialog.type === 'new' ? 'New Warranty Registration' : 'Warranty Registration Detail'}
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
              label="SKU"
              autoFocus
              id="code"
              name="code"
              disabled={true}
              value={this.state.code}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
                className="mb-24"
                label="Date"
                autoFocus
                id="date"
                name="date"
                value={this.state.date}
                variant="outlined"
                disabled={true}
                required
                fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>

            <TextField
                className="mb-24"
                label="Phone Number"
                autoFocus
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                variant="outlined"
                disabled={true}
                required
                fullWidth
            />
          </div>

          {this.state.details  ? (

              <div>
                {
                  this.state.details.map((dName,index)=>{
                    return(
                        <div key={index}>
                          <div className="flex">
                            <div className="min-w-48 pt-20">
                              {index+1}
                            </div>
                            <TextField
                                className="mb-24"
                                label={dName.field_name}
                                variant="outlined"
                                disabled={true}
                                fullWidth
                                style={{marginRight:5}}
                                value={dName.value} />
                          </div>
                        </div>
                    )
                  })
                }
              </div>
          ) : null}

        </DialogContent>

          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.closeComposeDialog();
              }}
            >
              Exit
            </Button>
            <IconButton
                hidden={localStorage.getItem('Role')!=='superAdmin'}
                disabled= {localStorage.getItem('Role')!=='superAdmin'}
              onClick={() => {
                removeWarrantyRegister(this.state.id);
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
      removeWarrantyRegister: Actions.removeWarrantyRegister
    },
    dispatch
  );
}

function mapStateToProps({ warrantyRegisterApp }) {
  return {
    contactDialog: warrantyRegisterApp.warrantyRegister.contactDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDialog);
