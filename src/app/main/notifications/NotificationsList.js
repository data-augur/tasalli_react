import React, {Component} from "react";
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
} from "@material-ui/core";
import {FuseAnimate, FuseUtils} from "@fuse";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import ReactTable from "react-table";
import moment from "moment";
import * as Actions from "./store/actions";

class NotificationsList extends Component {
    state = {
        selectedNotificationsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedNotificationMenu = event => {
        this.setState({selectedNotificationsMenu: event.currentTarget});
    };

    closeSelectedNotificationsMenu = () => {
        this.setState({selectedNotificationsMenu: null});
    };

    render() {
        const {
            notifications,
            searchText,
            selectedNotificationIds,

            openEditNotificationDialog,
            removeNotifications,
            // removeNotification,
            setNotificationsUnstarred,
            setNotificationsStarred,
            getNotificationPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(notifications, searchText);
        const {selectedNotificationsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no notification!
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
                                    openEditNotificationDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[
                        {
                            Header: () =>
                                selectedNotificationIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedNotificationsMenu
                                                    ? "selectedNotificationsMenu"
                                                    : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedNotificationMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedNotificationsMenu"
                                            anchorEl={selectedNotificationsMenu}
                                            open={Boolean(selectedNotificationsMenu)}
                                            onClose={this.closeSelectedNotificationsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeNotifications(selectedNotificationIds);
                                                        this.closeSelectedNotificationsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setNotificationsStarred(selectedNotificationIds);
                                                        this.closeSelectedNotificationsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setNotificationsUnstarred(selectedNotificationIds);
                                                        this.closeSelectedNotificationsMenu();
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
                            accessor: "avatar",
                            Cell: row => (
                                <Avatar
                                    className="mr-8"
                                    alt={row.original.name}
                                    src={row.value}
                                />
                            ),
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: "Title",
                            accessor: "title",
                            filterable: false,
                            className: "font-bold"
                            // className: "justify-center",
                        },
                        {
                            id: "send_date",
                            Header: "Send Date",
                            accessor: d => {
                                return moment(d.send_date)
                                    .local()
                                    .format("DD-MM-YYYY hh:mm:ss a")
                            },
                            filterable: false,
                            className: "font-bold justify-center"
                            // className: "justify-center",
                        },
                        {
                            Header: "Sender",
                            accessor: "sender",
                            filterable: false,
                            className: "font-bold justify-center"
                            // className: "justify-center",
                        },
                    ]}
                    defaultSorted={[
                        {
                            id: "send_Date",
                            desc: true
                        }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="No notification found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getNotificationPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getNotifications: Actions.getNotifications,
            toggleInSelectedNotifications: Actions.toggleInSelectedNotifications,
            selectAllNotifications: Actions.selectAllNotifications,
            deSelectAllNotifications: Actions.deSelectAllNotifications,
            openEditNotificationDialog: Actions.openEditNotificationDialog,
            getNotificationPaginationData: Actions.getNotificationsPaginationData,
            toggleStarredNotification: Actions.toggleStarredNotification,
            toggleStarredNotifications: Actions.toggleStarredNotifications,
            setNotificationsStarred: Actions.setNotificationsStarred,
            setNotificationsUnstarred: Actions.setNotificationsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({notificationsApp}) {
    return {
        notifications: notificationsApp.notifications.entities,
        totalPages: notificationsApp.notifications.pages,
        selectedNotificationIds:
        notificationsApp.notifications.selectedNotificationIds,
        searchText: notificationsApp.notifications.searchText,
        user: notificationsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(NotificationsList)
);
