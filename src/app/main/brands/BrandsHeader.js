import React, {Component} from 'react';
import {Button, Icon, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import CsvDownloader from 'react-csv-downloader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import _ from '@lodash';

class BrandsHeader extends Component {
    state = {
        companyId:'a'
    };
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render() {
        const {brands, searchText, searchBrandsByCompany, mainTheme} = this.props;
        const datas = this.getFilteredArray(brands, searchText);
        const columns = [
            {
                id: 'name',
                displayName: 'Brand'
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
                                Brands
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-8 sm:px-12">
                    <label>Select Company</label>
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Paper
                                    className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                    elevation={1}
                                >

                                    <select
                                        style={{width:'100%'}}
                                        onChange={this.handleChange}
                                        value={this.state.companyId}
                                        id="companyId"
                                        name="companyId"
                                    >
                                        <option value="">All</option>
                                        {this.props.companies.map(option => {
                                            return (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Paper>
                            </FuseAnimate>
                        </MuiThemeProvider>
                        <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
                            <Button
                                style={{marginTop:5}}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    searchBrandsByCompany(this.state.companyId);
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
                                <CsvDownloader columns={columns} datas={datas} filename="brands">
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
            searchBrandsByCompany: Actions.searchBrandsByCompany
        },
        dispatch
    );
}

function mapStateToProps({brandsApp, fuse}) {
    return {
        brands: brandsApp.brands.entities,
        searchText: brandsApp.brands.searchText,
        companies: brandsApp.brands.companies,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandsHeader);
