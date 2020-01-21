import React, {Component} from 'react';
import {Button, Icon,  MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import CsvDownloader from "react-csv-downloader";
import _ from '@lodash';
import TextField from "@material-ui/core/TextField";

class WarrantyClaimedsHeader extends Component {
    state = {
        userPhoneNumber:'',
        searchDate:"yyyy-mm-dd",
        searchCode:'',
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
        const {warrantyClaimeds,  searchText,searchWarrantyClaimed, mainTheme} = this.props;
        const datas = this.getFilteredArray(warrantyClaimeds, searchText);
        const columns = [
            {
                id: 'sku_code',
                displayName: 'SKU'
            },
            {
                id: 'code',
                displayName: 'Product Code'
            },
            {
                id: 'date',
                displayName: 'Date'
            },
            {
                id: 'phoneNumber',
                displayName: 'User Phone Number'
            },
            {
                id: 'cnic',
                displayName: 'User CNIC'
            },
            {
                id: 'userName',
                displayName: 'User Full Name'
            },
            {
                id: 'address',
                displayName: 'Address'
            },
            {
                id: 'city',
                displayName: 'City'
            },
            {
                id: 'email',
                displayName: 'Email'
            },
            {
                id: 'officeAddress',
                displayName: 'Office Address'
            },
            {
                id: 'ageGroup',
                displayName: 'Age Group'
            },
        ];

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Claimed Warranty
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
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
                                            // value={this.state.brandId}
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
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select User</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            // value={this.state.companyId}
                                            id="userPhoneNumber"
                                            name="userPhoneNumber"
                                        >
                                            <option value="">All</option>
                                            {this.props.userPhoneNumbers.map(options => {
                                                return (
                                                    <option key={options.phoneNumber} value={options.phoneNumber}>
                                                        {options.phoneNumber}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Code</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            // value={this.state.jobTitle}
                                            id="searchCode"
                                            name="searchCode"
                                        >
                                            <option value="">All</option>
                                            {this.props.codes.map(options => {
                                                return (
                                                    <option value={options.code}>
                                                        {options.code}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">

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
                                            // defaultValue={this.state.searchDate}
                                            id="searchDate"
                                            name="searchDate"
                                            onChange={this.handleChange}
                                            // disableUnderline={false}
                                        />
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>

                        <Button
                            style={{marginTop:5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchWarrantyClaimed(this.state);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>

                {datas && datas.length > 0 ?
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <CsvDownloader columns={columns} datas={datas} filename="Claimed Warranties">
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
            searchWarrantyClaimed: Actions.searchWarrantyClaimed
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimedApp, fuse}) {
    return {
        warrantyClaimeds: warrantyClaimedApp.warrantyClaimed.entities,
        searchText: warrantyClaimedApp.warrantyClaimed.searchText,
        skuCodes: warrantyClaimedApp.warrantyClaimed.skuCodes,
        codes: warrantyClaimedApp.warrantyClaimed.codes,
        userPhoneNumbers: warrantyClaimedApp.warrantyClaimed.userPhoneNumbers,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyClaimedsHeader);
