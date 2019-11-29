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

const newWarrantyRegisterState = {
  code: '',
  phoneNumber: '',
  date: '',
  id: '',
  details: []
};

class WarrantyRegisterDialog extends Component {
  state = { ...newWarrantyRegisterState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    // this.state.detail=this.state.details;

    if (
      !prevProps.warrantyRegisterDialog.props.open &&
      this.props.warrantyRegisterDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.warrantyRegisterDialog.type === 'edit' &&
        this.props.warrantyRegisterDialog.data &&
        !_.isEqual(this.props.warrantyRegisterDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyRegisterDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.warrantyRegisterDialog.type === 'new' &&
        !_.isEqual(newWarrantyRegisterState, prevState)
      ) {
        this.setState({ ...newWarrantyRegisterState });
      }
    }
  }



  closeComposeDialog = () => {
    this.props.warrantyRegisterDialog.type === 'edit'
      ? this.props.closeEditWarrantyRegisterDialog()
      : this.props.closeNewWarrantyRegisterDialog();
  };

  render() {
    const { warrantyRegisterDialog, removeWarrantyRegister } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...warrantyRegisterDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {warrantyRegisterDialog.type === 'new' ? 'New Warranty Registration' : 'Warranty Registration Detail'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="warrantyRegister avatar"
              src={this.state.avatar}
            /> */}
            {warrantyRegisterDialog.type === 'edit' && (
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
                if (window.confirm('Are you sure to delete this registered warranty?')) {
                  removeWarrantyRegister(this.state.id);
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
      closeEditWarrantyRegisterDialog: Actions.closeEditWarrantyRegisterDialog,
      closeNewWarrantyRegisterDialog: Actions.closeNewWarrantyRegisterDialog,
      removeWarrantyRegister: Actions.removeWarrantyRegister
    },
    dispatch
  );
}

function mapStateToProps({ warrantyRegisterApp }) {
  return {
    warrantyRegisterDialog: warrantyRegisterApp.warrantyRegister.warrantyRegisterDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarrantyRegisterDialog);
