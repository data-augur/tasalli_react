import React, {Component} from 'react';
import {
    AppBar, Avatar,
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

const popupsType = [
    {
        value: 'video',
        label: 'Video'
    },
    {
        value: 'survey',
        label: 'Survey'
    }
];
const newPopupState = {
    id: '',
    name: '',
    notification_id: '',
    duration: 3,
    // pictures: [],
    images: '',
    startTime: moment(new Date()).format('YYYY-MM-DDThh:mm'),
    endTime: moment(new Date()).format('YYYY-MM-DDThh:mm')
};

class POPUPSDialog extends Component {
    state = {...newPopupState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.popupDialog.props.open &&
            this.props.popupDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.popupDialog.type === 'edit' &&
                this.props.popupDialog.data &&
                !_.isEqual(this.props.popupDialog.data, prevState)
            ) {
                this.setState({...this.props.popupDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.popupDialog.type === 'new' &&
                !_.isEqual(newPopupState, prevState)
            ) {
                this.setState({...newPopupState});
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


    onEndChange = endTime => this.setState({endTime});
    onStartChange = startTime => this.setState({startTime});

    handleFile(e){
        let file=e.target.files[0]
        this.setState({images: file})
    }

    closeComposeDialog = () => {
        this.props.popupDialog.type === 'edit'
            ? this.props.closeEditPopupDialog()
            : this.props.closeNewPopupDialog();
    };


    canBeSubmitted() {
        const {type} = this.state;
        return type.length > 0;
    }

    handleDateChange = date => {
        this.setState({selectedDate: date});
    };


    render() {
        const {popupDialog, addPOPUPS, updatePOPUPS, removePOPUPS} = this.props;


        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...popupDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {popupDialog.type === 'new' ? 'New Pop up' : 'Edit Pop up'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {popupDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>

                    {/*{popupDialog.type === 'edit' ? (*/}
                    {/*<div className="flex" >*/}
                    {/*    <div className="min-w-48 pt-20">*/}
                    {/*        <Icon color="action">image</Icon>*/}
                    {/*    </div>*/}
                    {/*     <Avatar*/}
                    {/*     className="mr-8"*/}
                    {/*     alt='Image'*/}
                    {/*     // src="http:\\localhost:5000\images\bannerImage\bannerImage2020-02-13-16-34-10.jpg"*/}
                    {/*     src=''*/}
                    {/*     />*/}
                    {/*</div>*/}
                    {/*    ) : null}*/}
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Name</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
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
                                    value={moment(new Date(this.state.startTime)).format('YYYY-MM-DDThh:mm')}
                                    onChange={this.onStartChange}
                                    autoOk={true}
                                />
                                <TimePicker
                                    margin="normal"
                                    label="Starting Time"
                                    value={moment(new Date(this.state.startTime)).format('YYYY-MM-DDThh:mm')}
                                    onChange={this.onStartChange}
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
                                    value={moment(new Date(this.state.endTime)).format('YYYY-MM-DDThh:mm')}
                                    onChange={this.onEndChange}
                                    autoOk={true}
                                />
                                <TimePicker
                                    margin="normal"
                                    label="Ending Time"
                                    value={moment(new Date(this.state.endTime)).format('YYYY-MM-DDThh:mm')}
                                    onChange={this.onEndChange}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Duration</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Duration (sec)"
                            type="number"
                            id="duration"
                            name="duration"
                            min="0"
                            max="1000"
                            value={this.state.duration}
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
                            label="Select Notification"
                            id="notification_id"
                            name="notification_id"
                            select
                            value={this.state.notification_id}
                            onChange={this.handleChange}

                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {this.props.notifications.map(option => {

                                return (
                                    <option key={option.id} value={option.id}>
                                        {option.title}
                                    </option>
                                );
                            })}
                        </TextField>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">image</Icon>
                        </div>
                        <input title="Image" type="file" name="images" onChange={(e)=>this.handleFile(e)}
                        />

                    </div>

                </DialogContent>

                {popupDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                let dataToPass = {
                                    startTime: moment(new Date(this.state.startTime)).format('YYYY-MM-DD hh:mm:ss'),
                                    endTime: moment(new Date(this.state.endTime)).format('YYYY-MM-DD hh:mm:ss'),
                                    name: this.state.name,
                                    images: this.state.images,
                                    duration: this.state.duration,
                                    notification_id: this.state.notification_id
                                };
                                if (dataToPass.endTime > dataToPass.startTime) {
                                    let strDateTime = dataToPass.startTime;
                                    let myDate = new Date(strDateTime);
                                    dataToPass.startTime = myDate.toLocaleString();
                                    let strDateTimes = dataToPass.endTime;
                                    let myDates = new Date(strDateTimes);
                                    dataToPass.endTime = myDates.toLocaleString();

                                    addPOPUPS(dataToPass);
                                    this.closeComposeDialog();
                                } else {
                                    alert("Start Date should be greater than End Date!");
                                }
                            }}
                            disabled={
                                // this.state.name===''
                               this.state.notification_id==='' ||
                                this.state.duration<0 ||
                                this.state.images===''
                                // this.state.startTime!=='' ||
                                // this.state.endTime!==''
                            }
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
                                    startTime: moment(new Date(this.state.startTime)).format('YYYY-MM-DD hh:mm:ss'),
                                    endTime: moment(new Date(this.state.endTime)).format('YYYY-MM-DD hh:mm:ss'),
                                    name: this.state.name,
                                    images: this.state.images,
                                    duration: this.state.duration,
                                    notification_id: this.state.notification_id
                                };
                                if (dataToPass.endTime > dataToPass.startTime) {
                                    let strDateTime = dataToPass.startTime;
                                    let myDate = new Date(strDateTime);
                                    dataToPass.startTime = myDate.toLocaleString();
                                    let strDateTimes = dataToPass.endTime;
                                    let myDates = new Date(strDateTimes);
                                    dataToPass.endTime = myDates.toLocaleString();
                                    updatePOPUPS(dataToPass);
                                    this.closeComposeDialog();
                                } else {
                                    alert("Start Date should be greater than End Date!");
                                }
                            }}
                            disabled={
                                this.state.notification_id==='' ||
                                this.state.duration<0
                            }
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete Pop up')) {
                                    removePOPUPS(this.state.id);
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
            closeEditPopupDialog: Actions.closeEditPopupDialog,
            closeNewPopupDialog: Actions.closeNewPopupDialog,
            addPOPUPS: Actions.addPOPUPS,
            updatePOPUPS: Actions.updatePOPUPS,
            removePOPUPS: Actions.removePOPUPS
        },
        dispatch
    );
}

function mapStateToProps({popUpsApp}) {
    return {
        popupDialog: popUpsApp.popUps.popupDialog,
        notifications: popUpsApp.popUps.notifications
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POPUPSDialog);
