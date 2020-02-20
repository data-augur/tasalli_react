import React, { Component} from 'react';
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
import moment from "moment";

class RetailersList extends Component {
    state = {
        selectedRetailersMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedRetailerMenu = event => {
        this.setState({selectedRetailersMenu: event.currentTarget});
    };

    closeSelectedRetailersMenu = () => {
        this.setState({selectedRetailersMenu: null});
    };

    render() {
        const {
            retailers,
            searchText,
            selectedRetailerIds,
            removeRetailers,
            setRetailersUnstarred,
            setRetailersStarred,
            getRetailersPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(retailers, searchText);
        const {selectedRetailersMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no retailer users!
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
                            className: 'cursor-pointer',
                            onClick: () => {
                                if (rowInfo) {
                                    // openEditRetailerDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedRetailerIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedRetailersMenu ? 'selectedRetailersMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedRetailerMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedRetailersMenu"
                                            anchorEl={selectedRetailersMenu}
                                            open={Boolean(selectedRetailersMenu)}
                                            onClose={this.closeSelectedRetailersMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeRetailers(selectedRetailerIds);
                                                        this.closeSelectedRetailersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setRetailersStarred(selectedRetailerIds);
                                                        this.closeSelectedRetailersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setRetailersUnstarred(selectedRetailerIds);
                                                        this.closeSelectedRetailersMenu();
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
                            Header: 'ID',
                            width: 1,
                            accessor: 'id',
                            show: false,
                            // filterable: true,
                            // className: 'font-bold'
                            className: "justify-center",
                        },
                        {
                            Header: 'Retailer Phone',
                            accessor: 'phone_Number',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Shop',
                            accessor: 'shop_Name',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Date',
                            width: 170,
                            id: 'createdAt',
                            accessor: d => {
                                return moment(d.createdAt)
                                    .local()
                                    .format("DD-MM-YYYY hh:mm:ss a")
                            },
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'User Phone',
                            accessor: 'userPhone',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Longitude',
                            accessor: 'longitude',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Latitude',
                            accessor: 'latitude',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="No retailer found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getRetailersPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getRetailers: Actions.getRetailers,
            toggleInSelectedRetailers: Actions.toggleInSelectedRetailers,
            selectAllRetailers: Actions.selectAllRetailers,
            deSelectAllRetailers: Actions.deSelectAllRetailers,
            openEditRetailerDialog: Actions.openEditRetailerDialog,
            removeRetailers: Actions.removeRetailers,
            removeRetailer: Actions.removeRetailer,
            getRetailersPaginationData: Actions.getRetailersPaginationData,
            toggleStarredRetailer: Actions.toggleStarredRetailer,
            toggleStarredRetailers: Actions.toggleStarredRetailers,
            setRetailersStarred: Actions.setRetailersStarred,
            setRetailersUnstarred: Actions.setRetailersUnstarred
        },
        dispatch
    );
}

function mapStateToProps({retailersApp}) {
    return {
        retailers: retailersApp.retailers.entities,
        totalPages: retailersApp.retailers.pages,
        selectedRetailerIds: retailersApp.retailers.selectedRetailerIds,
        searchText: retailersApp.retailers.searchText,
        user: retailersApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RetailersList)
);
