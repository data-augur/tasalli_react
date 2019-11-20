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

const newWarrantyCompletionState = {
  formName: '',
  companyId: '',
  id: '',
  attributes: []
};

class WarrantyCompletionDialog extends Component {
  state = { ...newWarrantyCompletionState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.warrantyCompletionDialog.props.open &&
      this.props.warrantyCompletionDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.warrantyCompletionDialog.type === 'edit' &&
        this.props.warrantyCompletionDialog.data &&
        !_.isEqual(this.props.warrantyCompletionDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyCompletionDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.warrantyCompletionDialog.type === 'new' &&
        !_.isEqual(newWarrantyCompletionState, prevState)
      ) {
        this.setState({ ...newWarrantyCompletionState });
      }
    }
  }

  handleAttributeChange(e,index){
    this.state.attributes[index]=e.target.value;

    //set the changed state
    this.setState({attributes: this.state.attributes})
  }
  handleRemove(index){

    this.state.attributes.splice(index,1);

    this.setState({attributes:this.state.attributes});

  }
  addAttribute(){
    this.setState({attributes: [...this.state.attributes,""]})
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
    this.props.warrantyCompletionDialog.type === 'edit'
      ? this.props.closeEditWarrantyCompletionDialog()
      : this.props.closeNewWarrantyCompletionDialog();
  };

  canBeSubmitted() {
    const { formName } = this.state;
    return formName.length > 0;
  }

  render() {
    const { warrantyCompletionDialog, addWarrantyCompletion, updateWarrantyCompletion, removeWarrantyCompletion } = this.props;

    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...warrantyCompletionDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {warrantyCompletionDialog.type === 'new' ? 'New Warranty Completion' : 'Edit Warranty Completion'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {/* <Avatar
              className="w-96 h-96"
              alt="warrantyCompletion avatar"
              src={this.state.avatar}
            /> */}
            {warrantyCompletionDialog.type === 'edit' && (
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


              <div>
                {

                  this.state.attributes.map((attribute,index)=>{
                    return(
                        <div key={index}>
                          <div className="flex">
                            <div className="min-w-48 pt-20">
                              {index+1}
                            </div>
                            <TextField
                                className="mb-24"
                                label="Text"
                                variant="outlined"
                                rows={3}
                                fullWidth
                                multiline={true}
                                style={{marginRight:5}}
                                onChange={(e)=>this.handleAttributeChange(e,index)}
                                value={attribute} />

                            <IconButton
                                onClick={(e)=>this.handleRemove(index)}
                            >
                              <Icon>delete</Icon>
                            </IconButton>
                          </div>
                        </div>
                    )
                  })

                }
              </div>


              <div className="flex">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>this.addAttribute(e)}>Add Text</Button>
              </div>
        </DialogContent>

        {warrantyCompletionDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addWarrantyCompletion(this.state);
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
                updateWarrantyCompletion(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeWarrantyCompletion(this.state.id);
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
      closeEditWarrantyCompletionDialog: Actions.closeEditWarrantyCompletionDialog,
      closeNewWarrantyCompletionDialog: Actions.closeNewWarrantyCompletionDialog,
      addWarrantyCompletion: Actions.addWarrantyCompletion,
      updateWarrantyCompletion: Actions.updateWarrantyCompletion,
      removeWarrantyCompletion: Actions.removeWarrantyCompletion
    },
    dispatch
  );
}

function mapStateToProps({ warrantyCompletionApp }) {
  return {
    warrantyCompletionDialog: warrantyCompletionApp.warrantyCompletion.warrantyCompletionDialog,
    companies: warrantyCompletionApp.warrantyCompletion.companies
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarrantyCompletionDialog);
