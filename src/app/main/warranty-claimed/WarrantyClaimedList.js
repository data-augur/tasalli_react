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

class WarrantyClaimedsList extends Component {
    state = {
        selectedWarrantyClaimedsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyClaimedMenu = event => {
        this.setState({selectedWarrantyClaimedsMenu: event.currentTarget});
    };

    closeSelectedWarrantyClaimedsMenu = () => {
        this.setState({selectedWarrantyClaimedsMenu: null});
    };

    render() {
        const {
            warrantyClaimeds,
            searchText,
            selectedWarrantyClaimedIds,
            openEditWarrantyClaimedDialog,
            removeWarrantyClaimeds,
            removeWarrantyClaimed,
            setWarrantyClaimedsUnstarred,
            setWarrantyClaimedsStarred,
            getClaimedWarrantyPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(warrantyClaimeds, searchText);
        const {selectedWarrantyClaimedsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Warranty Claimed!
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
                                    openEditWarrantyClaimedDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyClaimedIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyClaimedsMenu ? 'selectedWarrantyClaimedsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyClaimedMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyClaimedsMenu"
                                            anchorEl={selectedWarrantyClaimedsMenu}
                                            open={Boolean(selectedWarrantyClaimedsMenu)}
                                            onClose={this.closeSelectedWarrantyClaimedsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyClaimeds(selectedWarrantyClaimedIds);
                                                        this.closeSelectedWarrantyClaimedsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimedsStarred(selectedWarrantyClaimedIds);
                                                        this.closeSelectedWarrantyClaimedsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimedsUnstarred(selectedWarrantyClaimedIds);
                                                        this.closeSelectedWarrantyClaimedsMenu();
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
                            Header: 'SKU',
                            accessor: 'sku_code',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Code',
                            accessor: 'code',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'User Phone',
                            accessor: 'phoneNumber',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Date',
                            accessor: 'date',
                            filterable: false,
                            className: 'font-bold justify-center'
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
                                            if (window.confirm('Are you sure to delete Claimed Warranty?')) {
                                                ev.stopPropagation();
                                                removeWarrantyClaimed(row.original.id);
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
                    noDataText="No Warranty Claimed"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getClaimedWarrantyPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getWarrantyClaimeds: Actions.getWarrantyClaimed,
            toggleInSelectedWarrantyClaimeds: Actions.toggleInSelectedWarrantyClaimeds,
            selectAllWarrantyClaimeds: Actions.selectAllWarrantyClaimeds,
            deSelectAllWarrantyClaimeds: Actions.deSelectAllWarrantyClaimeds,
            openEditWarrantyClaimedDialog: Actions.openEditWarrantyClaimedDialog,
            removeWarrantyClaimeds: Actions.removeWarrantyClaimeds,
            removeWarrantyClaimed: Actions.removeWarrantyClaimed,
            getClaimedWarrantyPaginationData: Actions.getClaimedWarrantyPaginationData,
            toggleStarredWarrantyClaimed: Actions.toggleStarredWarrantyClaimed,
            toggleStarredWarrantyClaimeds: Actions.toggleStarredWarrantyClaimeds,
            setWarrantyClaimedsStarred: Actions.setWarrantyClaimedsStarred,
            setWarrantyClaimedsUnstarred: Actions.setWarrantyClaimedsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimedApp}) {
    return {
        warrantyClaimeds: warrantyClaimedApp.warrantyClaimed.entities,
        totalPages: warrantyClaimedApp.warrantyClaimed.pages,
        selectedWarrantyClaimedIds: warrantyClaimedApp.warrantyClaimed.selectedWarrantyClaimedIds,
        searchText: warrantyClaimedApp.warrantyClaimed.searchText,
        user: warrantyClaimedApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyClaimedsList)
);
