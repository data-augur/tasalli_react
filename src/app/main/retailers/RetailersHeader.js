import React, {Component} from 'react';
import {Button, Icon, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import _ from '@lodash';
import TextField from "@material-ui/core/TextField";

class RetailersHeader extends Component {
    state = {
        userPhoneNumber:'',
        searchDate:"yyyy-mm-dd",
        retailerPhoneNumber:''
    };
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const { searchRetailers, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-12">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Retailers
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
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
                            <label>Select Retailer</label>
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
                                            id="retailerPhoneNumber"
                                            name="retailerPhoneNumber"
                                        >
                                            <option value="">All</option>
                                            {this.props.retailerPhoneNumbers.map(options => {
                                                return (
                                                    <option key={options.phone_Number} value={options.phone_Number}>
                                                        {options.phone_Number}
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
                                searchRetailers(this.state);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>


                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        {/*<MuiThemeProvider theme={mainTheme}>*/}
                        {/*    <FuseAnimate animation="transition.slideLeftIn" delay={300}>*/}
                        {/*        <CsvDownloader columns={columns} datas={datas} filename="retailers">*/}
                        {/*            <Button variant="contained" color="secondary">*/}
                        {/*                Export to CSV*/}
                        {/*            </Button>*/}
                        {/*        </CsvDownloader>*/}
                        {/*    </FuseAnimate>*/}
                        {/*</MuiThemeProvider>*/}
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
            searchRetailers: Actions.searchRetailers
        },
        dispatch
    );
}

function mapStateToProps({retailersApp, fuse}) {
    return {
        retailers: retailersApp.retailers.entities,
        searchText: retailersApp.retailers.searchText,
        retailerPhoneNumbers: retailersApp.retailers.retailerPhoneNumbers,
        userPhoneNumbers: retailersApp.retailers.userPhoneNumbers,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RetailersHeader);
