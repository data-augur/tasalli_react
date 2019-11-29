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
import axios from "axios";
import {Base_URL} from "../../server";


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

const newSurveyAttributeState = {
  field_name: '',
  field_type: '',
  survey_Id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
  id: '',
  option_value:[],
  options: []
};

class SurveyAttributeDialog extends Component {
  state = { ...newSurveyAttributeState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
        !prevProps.surveyAttributeDialog.props.open &&
        this.props.surveyAttributeDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
          this.props.surveyAttributeDialog.type === 'edit' &&
          this.props.surveyAttributeDialog.data &&
          !_.isEqual(this.props.surveyAttributeDialog.data, prevState)
      ) {
        this.setState({ ...this.props.surveyAttributeDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
          this.props.surveyAttributeDialog.type === 'new' &&
          !_.isEqual(newSurveyAttributeState, prevState)
      ) {
        this.setState({ ...newSurveyAttributeState });
      }
    }
  }

  getSurveyAttributeOption(id){
    axios
        .get(Base_URL+`get-a-survey-attribute-options/${id}`)
        .then(res =>
            {
              let result=res.data;
              for(let i=0;i<result.length;i++)
              {
                this.state.options[i]=result[i].option_value;
              }
            }
        )
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
    this.props.surveyAttributeDialog.type === 'edit'
        ? this.props.closeEditSurveyAttributeDialog()
        : this.props.closeNewSurveyAttributeDialog();
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
    const { surveyAttributeDialog, addSurveyAttribute, updateSurveyAttribute, removeSurveyAttribute } = this.props;

    return (
        <Dialog
            classes={{
              paper: 'm-24'
            }}
            {...surveyAttributeDialog.props}
            onClose={this.closeComposeDialog}
            fullWidth
            maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                {surveyAttributeDialog.type === 'new' ? 'New Survey Attribute' : 'Edit Survey Attribute'}
              </Typography>
            </Toolbar>
            <div className="flex flex-col items-center justify-center pb-24">
              {/* <Avatar
              className="w-96 h-96"
              alt="surveyAttribute avatar"
              src={this.state.avatar}
            /> */}
              {surveyAttributeDialog.type === 'edit' && (
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


            { surveyAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
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

            {surveyAttributeDialog.type === 'new' && (this.state.field_type==='radio' || this.state.field_type==='checkbox' || this.state.field_type==='spinner') ? (
                <div className="flex">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={(e)=>this.addOption(e)}>Add Options</Button>
                </div>
            ) : surveyAttributeDialog.type === 'edit' && this.state.field_type!=='input' ? (

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

          {surveyAttributeDialog.type === 'new' ? (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addSurveyAttribute(this.state);
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
                      updateSurveyAttribute(this.state);
                      this.closeComposeDialog();
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Save Survey Attribute
                </Button>
                <IconButton
                    onClick={() => {
                      if (window.confirm('Are you sure to delete '+this.state.field_name+' survey attribute with values?')) {
                        removeSurveyAttribute(this.state.id);
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
        closeEditSurveyAttributeDialog: Actions.closeEditSurveyAttributeDialog,
        closeNewSurveyAttributeDialog: Actions.closeNewSurveyAttributeDialog,
        addSurveyAttribute: Actions.addSurveyAttribute,
        updateSurveyAttribute: Actions.updateSurveyAttribute,
        removeSurveyAttribute: Actions.removeSurveyAttribute,
        getSurveyAttributeOptions: Actions.getSurveyAttributeOptions
      },
      dispatch
  );
}

function mapStateToProps({ surveyAttributeApp }) {
  return {
    surveyAttributeDialog: surveyAttributeApp.surveyAttribute.surveyAttributeDialog
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyAttributeDialog);
