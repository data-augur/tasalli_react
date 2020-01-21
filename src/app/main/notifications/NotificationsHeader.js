import React, {Component} from "react";
import {Button, Icon,  MuiThemeProvider, Paper, Typography} from "@material-ui/core";
import {FuseAnimate} from "@fuse";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "./store/actions";
import _ from '@lodash';
import TextField from "@material-ui/core/TextField";

class NotificationsHeader extends Component {
    state = {
        selectedDate:"yyyy-mm-dd"
    };
    render() {
        const { searchNotificationsByDate, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Notifications
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-0 items-center justify-center pr-8 sm:px-12">
                    <label>Select Date</label>
                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper
                                className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                elevation={1}
                            >

                                <TextField
                                    type="date"
                                    // defaultValue={this.state.searchDate}
                                    id="selectedDate"
                                    name="selectedDate"
                                    onChange={this.handleChange}
                                    // disableUnderline={false}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop:5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchNotificationsByDate(this.state.selectedDate);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">

                    </div>
                </div>
            </div>
        );
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
}

function mapDispatchToProps(dispatch) {
    Actions.reset();
    return bindActionCreators(
        {
            setSearchText: Actions.setSearchText,
            searchNotificationsByDate: Actions.searchNotificationsByDate
        },
        dispatch
    );
}

function mapStateToProps({notificationsApp, fuse}) {
    return {
        searchText: notificationsApp.notifications.searchText,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsHeader);
