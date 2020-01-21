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
import ReactTable from "react-table";
import * as Actions from './store/actions';

class AppusersList extends Component {

    state = {
        selectedAppusersMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedAppuserMenu = (event) => {
        this.setState({selectedAppusersMenu: event.currentTarget});
    };

    closeSelectedAppusersMenu = () => {
        this.setState({selectedAppusersMenu: null});
    };

    render() {
        const {appusers, searchText, selectedAppuserIds, openEditAppuserDialog, removeAppusers, removeAppUser, setAppusersUnstarred, setAppusersStarred, getAppUsersPaginationData, totalPages} = this.props;
        const data = this.getFilteredArray(appusers, searchText);
        const {selectedAppusersMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no App Users!
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
                            className: "cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    openEditAppuserDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () => (
                                selectedAppuserIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedAppusersMenu ? 'selectedAppusersMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedAppuserMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedAppusersMenu"
                                            anchorEl={selectedAppusersMenu}
                                            open={Boolean(selectedAppusersMenu)}
                                            onClose={this.closeSelectedAppusersMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeAppusers(selectedAppuserIds);
                                                        this.closeSelectedAppusersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAppusersStarred(selectedAppuserIds);
                                                        this.closeSelectedAppusersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAppusersUnstarred(selectedAppuserIds);
                                                        this.closeSelectedAppusersMenu();
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
                                )
                            ),
                            accessor: "avatar",
                            Cell: row => (
                                <Avatar className="mr-8" alt={row.original.name} src="/static/images/avatar/user.png"/>
                            ),
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: "Name",
                            accessor: "name",
                            // filterable: true,
                            className: "font-bold",
                            // className: "justify-center",
                        },
                        {
                            Header: "Phone",
                            accessor: "phoneNumber",
                            className: " justify-center",
                            // filterable: true
                        },
                        {
                            Header: "Gender",
                            accessor: "gender",
                            // filterable: true,
                            className: "justify-center",
                        },
                        {
                            Header: "Address",
                            accessor: "address",
                            // filterable: true,
                            className: "justify-center",
                        },
                        {
                            Header: "CNIC",
                            accessor: "cnic",
                            // filterable: true,
                            className: "justify-center",
                        },
                        {
                            Header: "City",
                            accessor: "city",
                            // filterable: true,
                            className: "justify-center",
                        },

                        {
                            Header: "",
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        hidden={localStorage.getItem('Role') !== 'superAdmin'}
                                        disabled={localStorage.getItem('Role') !== 'superAdmin'}
                                        onClick={(ev) => {
                                            if (window.confirm('Are you sure to delete ' + row.original.name + ' App user?')) {
                                                ev.stopPropagation();
                                                removeAppUser(row.original.id);
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
                    noDataText="No BrandUser found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getAppUsersPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
                        this.setState({loading: false});
                    }}
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // getAppusers             : Actions.getAppusers,
        toggleInSelectedAppusers: Actions.toggleInSelectedAppusers,
        selectAllAppusers: Actions.selectAllAppusers,
        deSelectAllAppusers: Actions.deSelectAllAppusers,
        openEditAppuserDialog: Actions.openEditAppuserDialog,
        removeAppusers: Actions.removeAppusers,
        removeAppUser: Actions.removeAppUser,
        getAppUsersPaginationData: Actions.getAppUsersPaginationData,
        toggleStarredAppuser: Actions.toggleStarredAppuser,
        toggleStarredAppusers: Actions.toggleStarredAppusers,
        setAppusersStarred: Actions.setAppusersStarred,
        setAppusersUnstarred: Actions.setAppusersUnstarred
    }, dispatch);
}

function mapStateToProps({appUserApp}) {
    return {
        appusers: appUserApp.appUser.entities,
        totalPages: appUserApp.appUser.pages,
        selectedAppuserIds: appUserApp.appUser.selectedAppuserIds,
        searchText: appUserApp.appUser.searchText,
        user: appUserApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppusersList));
