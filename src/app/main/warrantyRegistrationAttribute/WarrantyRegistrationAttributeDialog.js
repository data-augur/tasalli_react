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

const newWarrantyRegistrationAttributeState = {
  field_name: '',
  field_type: '',
  warrantyRegistrationForm_Id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
  id: '',
  option_value:[],
  options: []
};

class WarrantyRegistrationAttributeDialog extends Component {
  state = { ...newWarrantyRegistrationAttributeState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
        !prevProps.warrantyRegistrationAttributeDialog.props.open &&
        this.props.warrantyRegistrationAttributeDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
          this.props.warrantyRegistrationAttributeDialog.type === 'edit' &&
          this.props.warrantyRegistrationAttributeDialog.data &&
          !_.isEqual(this.props.warrantyRegistrationAttributeDialog.data, prevState)
      ) {
        this.setState({ ...this.props.warrantyRegistrationAttributeDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
          this.props.warrantyRegistrationAttributeDialog.type === 'new' &&
          !_.isEqual(newWarrantyRegistrationAttributeState, prevState)
      ) {
        this.setState({ ...newWarrantyRegistrationAttributeState });
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
    this.props.warrantyRegistrationAttributeDialog.type === 'edit'
        ? this.props.closeEditWarrantyRegistrationAttributeDialog()
        : this.props.closeNewWarrantyRegistrationAttributeDialog();
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
    const { warrantyRegistrationAttributeDialog, addWarrantyRegistrationAttribute, updateWarrantyRegistrationAttribute, removeWarrantyRegistrationAttribute } = this.props;

    return (
        <Dialog
            classes={{
              paper: 'm-24'
            }}
            {...warrantyRegistrationAttributeDialog.props}
            onClose={this.closeComposeDialog}
            fullWidth
            maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                {warrantyRegistrationAttributeDialog.type === 'new' ? 'New Warranty Registration Attribute' : 'Edit Warranty Registration Attribute'}
              </Typography>
            </Toolbar>
            <div className="flex flex-col items-center justify-center pb-24">
              {/* <Avatar
              className="w-96 h-96"
              alt="warrantyRegistrationAttribute avatar"
              src={this.state.avatar}
            /> */}
              {warrantyRegistrationAttributeDialog.type === 'edit' && (
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


            { warrantyRegistrationAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
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

            {warrantyRegistrationAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
                <div className="flex">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={(e)=>this.addOption(e)}>Add Options</Button>
                </div>
            ) : warrantyRegistrationAttributeDialog.type === 'edit' && this.state.field_type!=='input' ? (

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

          {warrantyRegistrationAttributeDialog.type === 'new' ? (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addWarrantyRegistrationAttribute(this.state);
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
                      updateWarrantyRegistrationAttribute(this.state);
                      this.closeComposeDialog();
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Save Survey Attribute
                </Button>
                <IconButton
                    onClick={() => {
                      removeWarrantyRegistrationAttribute(this.state.id);
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
        closeEditWarrantyRegistrationAttributeDialog: Actions.closeEditWarrantyRegistrationAttributeDialog,
        closeNewWarrantyRegistrationAttributeDialog: Actions.closeNewWarrantyRegistrationAttributeDialog,
        addWarrantyRegistrationAttribute: Actions.addWarrantyRegistrationAttribute,
        updateWarrantyRegistrationAttribute: Actions.updateWarrantyRegistrationAttribute,
        removeWarrantyRegistrationAttribute: Actions.removeWarrantyRegistrationAttribute,
        getWarrantyRegistrationAttributeOptions: Actions.getWarrantyRegistrationAttributeOptions
      },
      dispatch
  );
}

function mapStateToProps({ warrantyRegistrationAttributeApp }) {
  return {
    warrantyRegistrationAttributeDialog: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.warrantyRegistrationAttributeDialog
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyRegistrationAttributeDialog);
