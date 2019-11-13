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
// import {DateTimePicker} from "material-ui-pickers";
import DateTimePicker from 'react-datetime-picker'
import moment from "moment";
import Select from "@material-ui/core/Select";
import {showMessage} from 'app/store/actions/fuse';

import 'date-fns';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const adsType = [
  {
    // videoLink
    value: 'video',
    label: 'Video'
  },
  {
    value: 'survey',
    label: 'Survey'
  }
];
const newContactState = {
  type: '',
  video_link: '',
  survey_Id: '',
  time_from: moment(new Date()).format('YYYY-MM-DDThh:mm'),
  time_to: moment(new Date()).format('YYYY-MM-DDThh:mm')
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
  handleVideoLinkChange = event => {
    const re = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
    if(re.test(event.target.value))
    {
      this.setState(
          _.set(
              { ...this.state },
              event.target.name,
              event.target.type === 'checkbox'
                  ? event.target.checked
                  : event.target.value
          )
      );
    }
  };



  onToChange = time_to => this.setState({ time_to });
  onFromChange = time_from => this.setState({ time_from });


  closeComposeDialog = () => {
    this.props.contactDialog.type === 'edit'
        ? this.props.closeEditContactDialog()
        : this.props.closeNewContactDialog();
  };




  canBeSubmitted() {
    const { type } = this.state;
    return type.length > 0;
  }
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };


  render() {
    const { contactDialog, addAds, updateAds, removeAds } = this.props;

    const { classes } = this.props;
    const { selectedDate } = this.state;

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
                {contactDialog.type === 'new' ? 'New Ad' : 'Edit Ad'}
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

              <Select
                  className="mb-24"
                  label="Type"
                  id="type"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  // margin="normal"
                  fullWidth
                  variant="outlined"
                  // defaultValue={''}
              >
                {adsType.map(option => (
                    <option value={option.value.toString()}>
                      {option.label}
                    </option>
                ))}
              </Select>

            </div>

            {this.state.type==='videoLink' ||this.state.type==='video' ? (
                <div className="flex">
                  <div className="min-w-48 pt-20">
                    <Icon color="action">link</Icon>
                  </div>

                  <TextField
                      className="mb-24"
                      label="Link"
                      autoFocus
                      id="video_link"
                      placeholder="Paste Youtube Link here"
                      name="video_link"
                      value={this.state.video_link}
                      onChange={this.handleVideoLinkChange}
                      // onBlur={this.handleVideoLinkChange}
                      variant="outlined"
                      required
                      fullWidth
                  />
                </div>
            ) : null}

            {this.state.type==='survey' ? (
                <div className="flex">
                  <div className="min-w-48 pt-20">
                    <Icon color="action">work</Icon>
                  </div>
                  <TextField
                      className="mb-24"
                      label="Select Survey"
                      id="survey_Id"
                      name="survey_Id"
                      select
                      value={this.state.survey_Id}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                  >
                    {this.props.surveys.map(option => {

                      return (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                      );
                    })}
                  </TextField>
                </div>
            ) : null}


            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">Calender</Icon>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                      margin="normal"
                      className="mb-24"
                      label="From Date"
                      value={moment(new Date(this.state.time_from)).format('YYYY-MM-DDThh:mm')}
                      onChange={this.onFromChange}
                      autoOk={true}
                  />
                  <TimePicker
                      margin="normal"
                      label="Starting Time"
                      value={moment(new Date(this.state.time_from)).format('YYYY-MM-DDThh:mm')}
                      onChange={this.onFromChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">Calender</Icon>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                      margin="normal"
                      className="mb-24"
                      label="To Date"
                      value={moment(new Date(this.state.time_to)).format('YYYY-MM-DDThh:mm')}
                      onChange={this.onToChange}
                      autoOk={true}
                  />
                  <TimePicker
                      margin="normal"
                      label="Ending Time"
                      value={moment(new Date(this.state.time_to)).format('YYYY-MM-DDThh:mm')}
                      onChange={this.onToChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

            </div>

          </DialogContent>

          {contactDialog.type === 'new' ? (
              <DialogActions className="justify-between pl-16">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if(this.state.type==='survey')
                      {
                        this.state.video_link= null;
                      }
                      else if(this.state.type==='video')
                      {
                        this.state.survey_Id= null;
                      }
                      this.state.time_from=moment(new Date(this.state.time_from)).format('YYYY-MM-DD hh:mm:ss');
                      this.state.time_to=moment(new Date(this.state.time_to)).format('YYYY-MM-DD hh:mm:ss');
                      if(this.state.time_to>this.state.time_from)  //    moment(new Date(this.state.time_to)).format('YYYY-MM-DDThh:mm')
                      {
                        let strDateTime = this.state.time_to;
                        let myDate = new Date(strDateTime);
                        this.state.time_to=myDate.toLocaleString();
                        let strDateTimes = this.state.time_from;
                        let myDates = new Date(strDateTimes);
                        this.state.time_from=myDates.toLocaleString();
                        addAds(this.state);
                        this.closeComposeDialog();
                      }
                      else
                      {
                        alert("To Date should be greater than From Date!");
                      }
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
                      if(this.state.type==='survey')
                      {
                        this.state.video_link= null;
                      }
                      else if(this.state.type==='video')
                      {
                        this.state.survey_Id= null;
                      }
                      this.state.time_from=moment(new Date(this.state.time_from)).format('YYYY-MM-DD hh:mm:ss');
                      this.state.time_to=moment(new Date(this.state.time_to)).format('YYYY-MM-DD hh:mm:ss');
                      if(this.state.time_to>this.state.time_from)  //    moment(new Date(this.state.time_to)).format('YYYY-MM-DDThh:mm')
                      {
                        let strDateTime = this.state.time_to;
                        let myDate = new Date(strDateTime);
                        this.state.time_to=myDate.toLocaleString();
                        let strDateTimes = this.state.time_from;
                        let myDates = new Date(strDateTimes);
                        this.state.time_from=myDates.toLocaleString();
                        updateAds(this.state);
                        this.closeComposeDialog();
                      }
                      else
                      {
                        alert("To Date should be greater than From Date!");
                      }
                      // updateAds(this.state);
                    }}
                    disabled={!this.canBeSubmitted()}
                >
                  Save
                </Button>
                <IconButton
                    onClick={() => {
                      removeAds(this.state.id);
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
        addAds: Actions.addAds,
        updateAds: Actions.updateAds,
        removeAds: Actions.removeAds
      },
      dispatch
  );
}

function mapStateToProps({ adsApp }) {
  return {
    contactDialog: adsApp.ads.contactDialog,
    surveys: adsApp.ads.surveys
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDialog);