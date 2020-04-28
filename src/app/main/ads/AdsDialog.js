import React, {Component} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import moment from "moment";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from 'material-ui-pickers';

const newAdState = {
    id: '',
    video_link: '',
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    startTime: moment(new Date()).format('1970-10-10Thh:mm'),
    endTime: moment(new Date()).format('1970-10-10Thh:mm')
};

class AdDialog extends Component {
    state = {...newAdState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.adDialog.props.open &&
            this.props.adDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.adDialog.type === 'edit' &&
                this.props.adDialog.data &&
                !_.isEqual(this.props.adDialog.data, prevState)
            ) {
                this.setState({...this.props.adDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.adDialog.type === 'new' &&
                !_.isEqual(newAdState, prevState)
            ) {
                this.setState({...newAdState});
            }
        }
    }

    handleChange = event => {
        this.setState(
            _.set(
                {...this.state},
                event.target.name,
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            )
        );
    };
    handleVideoLinkChange = event => {
        const re = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
        if (re.test(event.target.value)) {
            this.setState(
                _.set(
                    {...this.state},
                    event.target.name,
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
                )
            );
        }
    };


    onEndDateChange = endDate => this.setState({endDate});
    onStartDateChange = startDate => this.setState({startDate});
    onEndTimeChange = endTime => this.setState({endTime});
    onStartTimeChange = startTime => this.setState({startTime});


    closeComposeDialog = () => {
        this.props.adDialog.type === 'edit'
            ? this.props.closeEditAdDialog()
            : this.props.closeNewAdDialog();
    };


    canBeSubmitted() {
        const {video_link} = this.state;
        return video_link.length > 0;
    }

    handleDateChange = date => {
        this.setState({selectedDate: date});
    };


    render() {
        const {adDialog, addAds, updateAds, removeAds} = this.props;


        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...adDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {adDialog.type === 'new' ? 'New Ad' : 'Edit Ad'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {adDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                <Icon color="action">link</Icon>
                            </div>

                            <TextField
                                className="mb-24"
                                label="Video Link"
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


                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Calender</Icon>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <DatePicker
                                    margin="normal"
                                    className="mb-24"
                                    label="Start Date"
                                    value={moment(new Date(this.state.startDate)).format('YYYY-MM-DD')}
                                    onChange={this.onStartDateChange}
                                    autoOk={true}
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
                                    label="End Date"
                                    value={moment(new Date(this.state.endDate)).format('YYYY-MM-DD')}
                                    onChange={this.onEndDateChange}
                                    autoOk={true}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Time</Icon>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <TimePicker
                                    margin="normal"
                                    label="Starting Time"
                                    value={moment(new Date(this.state.startTime)).format('1970-10-10Thh:mm')}
                                    onChange={this.onStartTimeChange}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Time</Icon>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <TimePicker
                                    margin="normal"
                                    label="Ending Time"
                                    value={moment(new Date(this.state.endTime)).format('1970-10-10Thh:mm')}
                                    onChange={this.onEndTimeChange}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>


                </DialogContent>

                {adDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                let dataToPass = {
                                    video_link: this.state.video_link,
                                    startDate: moment(new Date(this.state.startDate)).format('YYYY-MM-DD '),
                                    endDate: moment(new Date(this.state.endDate)).format('YYYY-MM-DD'),
                                    startTime: moment(new Date(this.state.startTime)).format('YYYY-MM-DD hh:mm:ss'),
                                    endTime: moment(new Date(this.state.endTime)).format('YYYY-MM-DD hh:mm:ss')
                                };
                                if (dataToPass.endDate > dataToPass.startDate) {
                                    if (dataToPass.endTime > dataToPass.startTime) {
                                        let startDate = dataToPass.startDate;
                                        let myStartDate = new Date(startDate);
                                        dataToPass.startDate = myStartDate.toLocaleString();
                                        let endDate = dataToPass.endDate;
                                        let myEndDate = new Date(endDate);
                                        dataToPass.endDate = myEndDate.toLocaleString();
                                        let startTime = dataToPass.startTime;
                                        let myStartTime = new Date(startTime);
                                        dataToPass.startTime = myStartTime.toLocaleString();
                                        let endTimes = dataToPass.endTime;
                                        let myEndTime = new Date(endTimes);
                                        dataToPass.endTime = myEndTime.toLocaleString();
                                        addAds(dataToPass);
                                        this.closeComposeDialog();
                                    } else {
                                        alert("To Time should be greater than From Time!");
                                    }
                                } else {
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
                                let dataToPass = {
                                    id: this.state.id,
                                    video_link: this.state.video_link,
                                    time_from: moment(new Date(this.state.time_from)).format('YYYY-MM-DD hh:mm:ss'),
                                    time_to: moment(new Date(this.state.time_to)).format('YYYY-MM-DD hh:mm:ss'),
                                };
                                if (dataToPass.time_to > dataToPass.time_from) {
                                    let strDateTime = dataToPass.time_to;
                                    let myDate = new Date(strDateTime);
                                    dataToPass.time_to = myDate.toLocaleString();
                                    let strDateTimes = dataToPass.time_from;
                                    let myDates = new Date(strDateTimes);
                                    dataToPass.time_from = myDates.toLocaleString();
                                    updateAds(dataToPass);
                                    this.closeComposeDialog();
                                } else {
                                    alert("To Date should be greater than From Date!");
                                }
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete Ad')) {
                                    removeAds(this.state.id);
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
            closeEditAdDialog: Actions.closeEditAdDialog,
            closeNewAdDialog: Actions.closeNewAdDialog,
            addAds: Actions.addAds,
            updateAds: Actions.updateAds,
            removeAds: Actions.removeAds
        },
        dispatch
    );
}

function mapStateToProps({adsApp}) {
    return {
        adDialog: adsApp.ads.adDialog,
        surveys: adsApp.ads.surveys
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdDialog);
