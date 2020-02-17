import React, {Component} from 'react';
import {Button, Icon, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import CsvDownloader from 'react-csv-downloader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import _ from '@lodash';
import TextField from "@material-ui/core/TextField";

class QrCodesHeader extends Component {
    state = {
        searchDate:"yyyy-mm-dd",
        phoneNumber:'',
        code_type:''
    };
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const {qrcodes, searchText, searchQrCodes, mainTheme} = this.props;
        const datas = this.getFilteredArray(qrcodes, searchText);
        const columns = [
            {
                id: 'name',
                displayName: 'QrCode'
            },
            {
                id: 'companyName',
                displayName: 'Company Name'
            },
        ];

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-12">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                QR Codes
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-2 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-0 items-center justify-center pr-8 sm:px-6">
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Code Type</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.code_type}
                                            id="code_type"
                                            name="code_type"
                                        >
                                            <option value="">All</option>
                                            <option value="QR_CODE">QR CODE</option>
                                            <option value="DATA_MATRIX">DATA MATRIX</option>
                                            <option value="UPC_E">BAR CODE</option>

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
                                    searchQrCodes(this.state);
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>

                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

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
            searchQrCodes: Actions.searchQrCodes
        },
        dispatch
    );
}

function mapStateToProps({qrcodesApp, fuse}) {
    return {
        qrcodes: qrcodesApp.qrcodes.entities,
        searchText: qrcodesApp.qrcodes.searchText,
        phoneNumbers: qrcodesApp.qrcodes.phoneNumbers,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QrCodesHeader);
