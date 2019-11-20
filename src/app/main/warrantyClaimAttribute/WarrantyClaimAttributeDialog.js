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


const attributesType = [
  {
    value: 'input',
    label: 'Text Field'
  },
  {
    value: 'radio',
    label: 'Radio Button'
  },
  {
    value: 'checkbox',
    label: 'Check box'
  },
  {
    value: 'spinner',
    label: 'Drop Down List'
  }
];

const newWarrantyClaimAttributeState = {
  field_name: '',
  field_type: '',
  warrantyClaimForm_Id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
  id: '',
  option_value:[],
  options: []
};

class WarrantyClaimAttributeDialog extends Component {
  state = { ...newWarrantyClaimAttributeState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
        !prevProps.warrantyClaimAttributeDialog.props.open &&
        this.props.warrantyClaimAttributeDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
          this.props.warrantyClaimAttributeDialog.type === 'edit' &&
          this.props.warrantyClaimAttributeDialog.data &&
          !_.isEqual(this.props.warrantyClaimAttributeDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyClaimAttributeDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
          this.props.warrantyClaimAttributeDialog.type === 'new' &&
          !_.isEqual(newWarrantyClaimAttributeState, prevState)
      ) {
        this.setState({ ...newWarrantyClaimAttributeState });
      }
    }
  }

  handleOptionChange(e,index){
    this.state.options[index]=e.target.value;

    //set the changed state
    this.setState({options: this.state.options})
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
    // this.state.options=[];
  //  this.handleAllRemove();
    this.props.warrantyClaimAttributeDialog.type === 'edit'
        ? this.props.closeEditWarrantyClaimAttributeDialog()
        : this.props.closeNewWarrantyClaimAttributeDialog();
  };

  canBeSubmitted() {
    const { field_name } = this.state;
    const { field_type } = this.state;
    return field_name.length > 0 && field_type.length >0 ;
  }

  handleRemove(index){

    this.state.options.splice(index,1);

    this.setState({options:this.state.options});

  }


  addOption(){
    this.setState({options: [...this.state.options,""]})
  }


  render() {
    const { warrantyClaimAttributeDialog, addWarrantyClaimAttribute, updateWarrantyClaimAttribute, removeWarrantyClaimAttribute } = this.props;

    return (
        <Dialog
            classes={{
              paper: 'm-24'
            }}
            {...warrantyClaimAttributeDialog.props}
            onClose={this.closeComposeDialog}
            fullWidth
            maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                {warrantyClaimAttributeDialog.type === 'new' ? 'New Warranty Claim Attribute' : 'Edit Warranty Claim Attribute'}
              </Typography>
            </Toolbar>
            <div className="flex flex-col items-center justify-center pb-24">
              {/* <Avatar
              className="w-96 h-96"
              alt="warrantyClaimAttribute avatar"
              src={this.state.avatar}
            /> */}
              {warrantyClaimAttributeDialog.type === 'edit' && (
                  <Typography variant="h6" color="inherit" className="pt-8">
                    {this.state.field_name}
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
                  label="Attribute Name"
                  autoFocus
                  id="field_name"
                  name="field_name"
                  value={this.state.field_name}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
              />
            </div>

            <TextField
                className="mb-24"
                label="Survey ID"
                autoFocus
                id="survey_Id"
                name="survey_Id"
                style={{display:'none'}}
                value={this.state.survey_Id}
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
            />

            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_circle</Icon>
              </div>
              <TextField
                  className="mb-24"
                  label="Type"
                  select
                  id="field_type"
                  name="field_type"
                  value={this.state.field_type}
                  onChange={this.handleChange}
                  // defaultValue="Brand Admin"
                  // helperText="Please select "
                  // margin="normal"
                  variant="outlined"
                  required
                  fullWidth
              >
                {attributesType.map(option => {
                  return (
                      <option value={option.value.toString()}>
                        {option.label}
                      </option>
                  );
                })}
              </TextField>
            </div>


            { warrantyClaimAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
                <div>
                  {

                    this.state.options.map((option,index)=>{
                      return(
                          <div key={index}>
                            <div className="flex">
                              <div className="min-w-48 pt-20">
                                {index+1}
                              </div>
                              <TextField
                                  className="mb-24"
                                  label="Option"
                                  variant="outlined"
                                  style={{marginRight:5}}
                                  onChange={(e)=>this.handleOptionChange(e,index)}
                                  value={option} />

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
            ) : null}

            {warrantyClaimAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
                <div className="flex">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={(e)=>this.addOption(e)}>Add Options</Button>
                </div>
            ) : warrantyClaimAttributeDialog.type === 'edit' && this.state.field_type!=='input' ? (

                <div>
                  {
                    this.state.options.map((option,index)=>{
                      return(
                          <div key={index}>
                            <div className="flex">
                              <div className="min-w-48 pt-20">
                                {index+1}
                              </div>
                              <TextField
                                  className="mb-24"
                                  label="Option"
                                  variant="outlined"
                                  disabled={true}
                                  fullWidth
                                  style={{marginRight:5}}
                                  onChange={(e)=>this.handleOptionChange(e,index)}
                                  value={option.option_value} />

                              {/*<IconButton*/}
                              {/*    onClick={(e)=>this.handleRemove(index)}*/}
                              {/*>*/}
                              {/*  <Icon>delete</Icon>*/}
                              {/*</IconButton>*/}
                            </div>
                          </div>
                      )
                    })
                  }

                </div>



              // {
              //   this.getSurveyAttributeOption(this.state.id)
              // }
              // <div>
              // {
              //   this.state.options.map((option,index)=>{
              //     return(
              //         <div key={index}>
              //           <div className="flex">
              //             <div className="min-w-48 pt-20">
              //               {index+1}
              //             </div>
              //             <TextField
              //                 className="mb-24"
              //                 label="Option"
              //                 disabled={true}
              //                 variant="outlined"
              //                 style={{marginRight:5}}
              //                 onChange={(e)=>this.handleOptionChange(e,index)}
              //                 value={option} />
              //           </div>
              //         </div>
              //     )
              //   }
                // )
              //
              // }
              //
              // </div>




            ) : null}



          </DialogContent>

          {warrantyClaimAttributeDialog.type === 'new' ? (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addWarrantyClaimAttribute(this.state);
                      this.closeComposeDialog();
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Add Survey Attribute
                </Button>
              </DialogActions>
          ) : (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      updateWarrantyClaimAttribute(this.state);
                      this.closeComposeDialog();
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Save Survey Attribute
                </Button>
                <IconButton
                    onClick={() => {
                      removeWarrantyClaimAttribute(this.state.id);
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
        closeEditWarrantyClaimAttributeDialog: Actions.closeEditWarrantyClaimAttributeDialog,
        closeNewWarrantyClaimAttributeDialog: Actions.closeNewWarrantyClaimAttributeDialog,
        addWarrantyClaimAttribute: Actions.addWarrantyClaimAttribute,
        updateWarrantyClaimAttribute: Actions.updateWarrantyClaimAttribute,
        removeWarrantyClaimAttribute: Actions.removeWarrantyClaimAttribute,
        getWarrantyClaimAttributeOptions: Actions.getWarrantyClaimAttributeOptions
      },
      dispatch
  );
}

function mapStateToProps({ warrantyClaimAttributeApp }) {
  return {
    warrantyClaimAttributeDialog: warrantyClaimAttributeApp.warrantyClaimAttribute.warrantyClaimAttributeDialog
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyClaimAttributeDialog);
