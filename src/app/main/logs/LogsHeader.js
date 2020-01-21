import React, {Component} from 'react';
import {Button, Icon,  MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import CsvDownloader from 'react-csv-downloader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import _ from '@lodash';
import TextField from "@material-ui/core/TextField";

class LogsHeader extends Component {
    state = {
        status:'',
        searchDate:"yyyy-mm-dd",
        phoneNumber:'',
        skuCode:''
    };
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const {logs,  searchText, searchLogs, mainTheme} = this.props;
        const datas = this.getFilteredArray(logs, searchText);
        const columns = [
            {
                id: 'phoneNumber',
                displayName: 'Phone Number'
            },
            {
                id: 'code',
                displayName: 'SKU Code'
            },
            {
                id: 'status',
                displayName: 'Status'
            },
            {
                id: 'latitude',
                displayName: 'Latitude'
            },
            {
                id: 'longitude',
                displayName: 'Longitude'
            },
            {
                id: 'time',
                displayName: 'Time'
            }
        ];

        return (
            <div className="flex flex-1 items-center justify-between p-4 sm:p-8">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Logs
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-2 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-0 items-center justify-center pr-8 sm:px-6">
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Status</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.status}
                                            id="status"
                                            name="status"
                                        >
                                            <option value="">All</option>
                                            <option value="VALID">Valid</option>
                                            <option value="INVALID">Invalid</option>
                                            <option value="Cypheme Server Error">Cypheme Server Error</option>
                                            <option value="Image Does Not Contains Code">Image Does Not Contains Code</option>

                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                        <div className="d-flex flex-column flex-0 items-center justify-center pr-6 sm:px-4">
                            <label>Select Phone Number</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.phoneNumber}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                        >
                                            <option value="">All</option>
                                            {this.props.phoneNumbers.map(option => {
                                                return (
                                                    <option key={option.phoneNumber} value={option.phoneNumber}>
                                                        {option.phoneNumber}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                        <div className="d-flex flex-column flex-0 items-center justify-center pr-6 sm:px-4">
                            <label>Select SKU Code</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.skuCode}
                                            id="skuCode"
                                            name="skuCode"
                                        >
                                            <option value="">All</option>
                                            {this.props.skuCodes.map(option => {
                                                return (
                                                    <option key={option.code} value={option.code}>
                                                        {option.code}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center pr-8 sm:px-12">
                        <div className="d-flex flex-column flex-0 items-center float-left pr-6 sm:px-4">
                            <label>Select Date</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >

                                        <TextField
                                            type="date"
                                            defaultValue={this.state.searchDate}
                                            id="searchDate"
                                            name="searchDate"
                                            onChange={this.handleChange}
                                            // disableUnderline={false}
                                        />
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                        <div className="float-left">
                            <Button
                                style={{marginTop:5}}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    searchLogs(this.state);
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>

                {datas && datas.length > 0 ?
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <CsvDownloader columns={columns} datas={datas} filename="logs">
                                    <Button variant="contained" color="secondary">
                                        Export to CSV
                                    </Button>
                                </CsvDownloader>
                            </FuseAnimate>
                        </MuiThemeProvider>
                    </div>
                    : null}
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
            searchLogs: Actions.searchLogs
        },
        dispatch
    );
}

function mapStateToProps({logsApp, fuse}) {
    return {
        logs: logsApp.logs.entities,
        searchText: logsApp.logs.searchText,
        skuCodes: logsApp.logs.skuCodes,
        phoneNumbers: logsApp.logs.phoneNumbers,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogsHeader);
