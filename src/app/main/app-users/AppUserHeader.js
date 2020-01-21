import React, {Component} from 'react';
import {Button, Icon, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import CsvDownloader from "react-csv-downloader";
import _ from '@lodash';

class AppusersHeader extends Component {
    state = {
        city:'',
        gender:''
    };
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const {appusers, searchText,searchAppUsers, mainTheme} = this.props;
        const datas = this.getFilteredArray(appusers, searchText);
        const columns = [
            {
                id: 'name',
                displayName: 'Name'
            },
            {
                id: 'phoneNumber',
                displayName: 'Phone'
            },
            {
                id: 'gender',
                displayName: 'Gender'
            },
            {
                id: 'address',
                displayName: 'Address'
            },
            {
                id: 'cnic',
                displayName: 'CNIC'
            },
            {
                id: 'city',
                displayName: 'City'
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
                                App Users
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select City</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.city}
                                            id="city"
                                            name="city"
                                        >
                                            <option value="">All</option>
                                            {this.props.cities.map(option => {
                                                return (
                                                    <option key={option.city} value={option.city}>
                                                        {option.city}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Gender</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width:'100%'}}
                                            onChange={this.handleChange}
                                            value={this.state.gender}
                                            id="gender"
                                            name="gender"
                                        >
                                            <option value="">All</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop:5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchAppUsers(this.state);
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
                                <CsvDownloader columns={columns} datas={datas} filename="appUsers">
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
            searchAppUsers: Actions.searchAppUsers
        },
        dispatch
    );
}

function mapStateToProps({appUserApp, fuse}) {
    return {
        appusers: appUserApp.appUser.entities,
        searchText: appUserApp.appUser.searchText,
        cities: appUserApp.appUser.cities,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppusersHeader);
