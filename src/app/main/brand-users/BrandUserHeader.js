import React, {Component} from 'react';
import {Button, Icon, Input, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import CsvDownloader from 'react-csv-downloader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';

class BrandUsersHeader extends Component {

    getBrandUsersArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);

    };

    render() {
        const {brandUsers, setSearchText, searchText, mainTheme} = this.props;
        const brandUsersArray = this.getBrandUsersArray(brandUsers, searchText);
        const columns = [
            {
                id: 'id',
                displayName: 'ID'
            },
            {
                id: 'name',
                displayName: 'Name'
            },
            {
                id: 'email',
                displayName: 'Email'
            },
            {
                id: 'gender',
                displayName: 'Gender'
            },
            {
                id: 'role',
                displayName: 'Role'
            },
            {
                id: 'phoneNumber',
                displayName: 'Phone Number'
            },
            {
                id: 'brand_Name',
                displayName: 'Brand Name'
            },
            {
                id: 'company_Name',
                displayName: 'Company Name'
            },
            {
                id: 'address',
                displayName: 'Address'
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
                                Client Users
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

                {brandUsersArray && brandUsersArray.length > 0 ?
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <CsvDownloader columns={columns} datas={brandUsersArray} filename="brandUsers">
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

function mapStateToProps({brandUserApp, fuse}) {
    return {
        brandUsers: brandUserApp.brandUser.entities,
        searchText: brandUserApp.brandUser.searchText,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandUsersHeader);
