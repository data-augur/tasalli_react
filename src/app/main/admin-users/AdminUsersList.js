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

class AdminsList extends Component {

    state = {
        selectedAdminsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedAdminMenu = (event) => {
        this.setState({selectedAdminsMenu: event.currentTarget});
    };

    closeSelectedAdminsMenu = () => {
        this.setState({selectedAdminsMenu: null});
    };

    render() {
        const {admins, searchText, selectedAdminIds, openEditAdminDialog, removeAdmins, removeAdminUser, setAdminsUnstarred, setAdminsStarred,getAdminsPaginationData, totalPages} = this.props;
        const data = this.getFilteredArray(admins, searchText);
        const {selectedAdminsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Admin Users!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo) => {
                        return {
                            className: "cursor-pointer",
                            onClick: () => {
                                if (rowInfo) {
                                    openEditAdminDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header: () => (
                                selectedAdminIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedAdminsMenu ? 'selectedAdminsMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedAdminMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedAdminsMenu"
                                            anchorEl={selectedAdminsMenu}
                                            open={Boolean(selectedAdminsMenu)}
                                            onClose={this.closeSelectedAdminsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeAdmins(selectedAdminIds);
                                                        this.closeSelectedAdminsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAdminsStarred(selectedAdminIds);
                                                        this.closeSelectedAdminsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAdminsUnstarred(selectedAdminIds);
                                                        this.closeSelectedAdminsMenu();
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
                            Header: "Email",
                            accessor: "email",
                            // filterable: true,
                            className: "font-bold",
                            // className: "justify-center",
                        },
                        {
                            Header: "Role",
                            accessor: "role",
                            className: " justify-center",
                            // filterable: true
                        },
                        {
                            Header: "",
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            if (window.confirm('Are you sure to delete ' + row.original.email + ' Admin user?')) {
                                                ev.stopPropagation();
                                                removeAdminUser(row.original.id);
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
                    noDataText="No AdminUser found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getAdminsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
                        this.setState({loading: false});
                    }}
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // getAdmins             : Actions.getAdmins,
        toggleInSelectedAdmins: Actions.toggleInSelectedAdmins,
        selectAllAdmins: Actions.selectAllAdmins,
        deSelectAllAdmins: Actions.deSelectAllAdmins,
        openEditAdminDialog: Actions.openEditAdminDialog,
        removeAdmins: Actions.removeAdmins,
        removeAdminUser: Actions.removeAdminUser,
        getAdminsPaginationData: Actions.getAdminsPaginationData,
        toggleStarredAdmin: Actions.toggleStarredAdmin,
        toggleStarredAdmins: Actions.toggleStarredAdmins,
        setAdminsStarred: Actions.setAdminsStarred,
        setAdminsUnstarred: Actions.setAdminsUnstarred
    }, dispatch);
}

function mapStateToProps({adminUserApp}) {
    return {
        admins: adminUserApp.adminUser.entities,
        totalPages: adminUserApp.adminUser.pages,
        selectedAdminIds: adminUserApp.adminUser.selectedAdminIds,
        searchText: adminUserApp.adminUser.searchText,
        user: adminUserApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminsList));
