import React, {Component} from 'react';
import {Button, Icon,  MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import _ from '@lodash';

class WarrantyClaimsHeader extends Component {
    state = {
        companyId:''
    };
    render() {
        const {searchWarrantyClaimByCompany, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Warranty Claim
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
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop:5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchWarrantyClaimByCompany(this.state.companyId);
                            }}
                        >
                            Apply
                        </Button>
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
            searchWarrantyClaimByCompany: Actions.searchWarrantyClaimByCompany
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimApp, fuse}) {
    return {
        searchText: warrantyClaimApp.warrantyClaim.searchText,
        companies: warrantyClaimApp.warrantyClaim.companies,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyClaimsHeader);
