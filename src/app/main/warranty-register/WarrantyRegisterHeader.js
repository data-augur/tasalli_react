import React, {Component} from 'react';
import {Button, Hidden, Icon, IconButton, Input, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import CsvDownloader from "react-csv-downloader";

class WarrantyRegistersHeader extends Component {

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const {warrantyRegisters, setSearchText, searchText, pageLayout, mainTheme} = this.props;
        const datas = this.getFilteredArray(warrantyRegisters, searchText);
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
            {
                id: 'retailerNumber',
                displayName: 'Retailer Number'
            },
            {
                id: 'retailerName',
                displayName: 'Retailer Name'
            },
            {
                id: 'retailerCity',
                displayName: 'Retailer City'
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
                                Registered Warranty
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper
                                className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                elevation={1}
                            >
                                <Icon className="mr-8" color="action">
                                    search
                                </Icon>

                                <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>

                {datas && datas.length > 0 ?
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <CsvDownloader columns={columns} datas={datas} filename="Registered Warranties">
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
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setSearchText: Actions.setSearchText
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegisterApp, fuse}) {
    return {
        warrantyRegisters: warrantyRegisterApp.warrantyRegister.entities,
        searchText: warrantyRegisterApp.warrantyRegister.searchText,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyRegistersHeader);
