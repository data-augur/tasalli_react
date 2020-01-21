import React, {Component} from 'react';
import {
    Avatar,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Typography
} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';

class CompanysList extends Component {
    state = {
        selectedCompanysMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedCompanyMenu = event => {
        this.setState({selectedCompanysMenu: event.currentTarget});
    };

    closeSelectedCompanysMenu = () => {
        this.setState({selectedCompanysMenu: null});
    };

    render() {
        const {
            companys,
            searchText,
            selectedCompanyIds,

            openEditCompanyDialog,
            removeCompanys,
            removeCompany,
            setCompanysUnstarred,
            setCompanysStarred,
            getCompaniesPaginationData,
            totalPages,
        } = this.props;
        const data = this.getFilteredArray(companys, searchText);
        const {selectedCompanysMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no company!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: 'cursor-pointer',
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    openEditCompanyDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedCompanyIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedCompanysMenu ? 'selectedCompanysMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedCompanyMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedCompanysMenu"
                                            anchorEl={selectedCompanysMenu}
                                            open={Boolean(selectedCompanysMenu)}
                                            onClose={this.closeSelectedCompanysMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeCompanys(selectedCompanyIds);
                                                        this.closeSelectedCompanysMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setCompanysStarred(selectedCompanyIds);
                                                        this.closeSelectedCompanysMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setCompanysUnstarred(selectedCompanyIds);
                                                        this.closeSelectedCompanysMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star_border</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Unstarred"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                ),
                            accessor: 'avatar',
                            Cell: row => (
                                <Avatar
                                    className="mr-8"
                                    alt={row.original.name}
                                    src={row.value}
                                />
                            ),
                            className: 'justify-center',
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: 'Name',
                            accessor: 'name',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: '',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        hidden={localStorage.getItem('Role') !== 'superAdmin'}
                                        disabled={localStorage.getItem('Role') !== 'superAdmin'}
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete ' + row.original.name + ' company?')) {
                                                ev.stopPropagation();
                                                removeCompany(row.original.id);
                                            }
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="No company found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getCompaniesPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
                        this.setState({loading: false});
                    }}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCompanys: Actions.getCompanies,
            toggleInSelectedCompanys: Actions.toggleInSelectedCompanys,
            selectAllCompanys: Actions.selectAllCompanys,
            deSelectAllCompanys: Actions.deSelectAllCompanys,
            openEditCompanyDialog: Actions.openEditCompanyDialog,
            removeCompanys: Actions.removeCompanys,
            removeCompany: Actions.removeCompany,
            toggleStarredCompany: Actions.toggleStarredCompany,
            toggleStarredCompanys: Actions.toggleStarredCompanys,
            setCompanysStarred: Actions.setCompanysStarred,
            getCompaniesPaginationData: Actions.getCompaniesPaginationData,
            setCompanysUnstarred: Actions.setCompanysUnstarred
        },
        dispatch
    );
}

function mapStateToProps({companiesApp}) {
    return {
        companys: companiesApp.companies.entities,
        totalPages: companiesApp.companies.pages,
        selectedCompanyIds: companiesApp.companies.selectedCompanyIds,
        searchText: companiesApp.companies.searchText,
        user: companiesApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompanysList)
);
