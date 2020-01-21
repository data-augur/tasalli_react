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

class WarrantyClaimsList extends Component {
    state = {
        selectedWarrantyClaimsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyClaimMenu = event => {
        this.setState({selectedWarrantyClaimsMenu: event.currentTarget});
    };

    closeSelectedWarrantyClaimsMenu = () => {
        this.setState({selectedWarrantyClaimsMenu: null});
    };

    render() {
        const {
            warrantyClaims,
            searchText,
            selectedWarrantyClaimIds,

            openEditWarrantyClaimDialog,
            removeWarrantyClaims,
            removeWarrantyClaim,
            setWarrantyClaimsUnstarred,
            setWarrantyClaimsStarred,
            getWarrantyClaimPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(warrantyClaims, searchText);
        const {selectedWarrantyClaimsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no warranty claim!
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
                                    openEditWarrantyClaimDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyClaimIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyClaimsMenu ? 'selectedWarrantyClaimsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyClaimMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyClaimsMenu"
                                            anchorEl={selectedWarrantyClaimsMenu}
                                            open={Boolean(selectedWarrantyClaimsMenu)}
                                            onClose={this.closeSelectedWarrantyClaimsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyClaims(selectedWarrantyClaimIds);
                                                        this.closeSelectedWarrantyClaimsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimsStarred(selectedWarrantyClaimIds);
                                                        this.closeSelectedWarrantyClaimsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimsUnstarred(selectedWarrantyClaimIds);
                                                        this.closeSelectedWarrantyClaimsMenu();
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
                            Header: 'Warranty Claim Forms',
                            accessor: 'formName',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Company',
                            accessor: 'companyName',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Add/Edit Attributes',
                            width: 130,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            ev.stopPropagation();
                                            window.location.href = "warrantyClaimAttribute/" + (row.original.id);
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </div>
                            )
                        },
                        {
                            Header: '',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete ' + row.original.formName + ' warranty claim?')) {
                                                ev.stopPropagation();
                                                removeWarrantyClaim(row.original.id);
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
                    noDataText="No Warranty Claim found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getWarrantyClaimPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getWarrantyClaims: Actions.getWarrantyClaim,
            toggleInSelectedWarrantyClaims: Actions.toggleInSelectedWarrantyClaims,
            selectAllWarrantyClaims: Actions.selectAllWarrantyClaims,
            deSelectAllWarrantyClaims: Actions.deSelectAllWarrantyClaims,
            openEditWarrantyClaimDialog: Actions.openEditWarrantyClaimDialog,
            removeWarrantyClaims: Actions.removeWarrantyClaims,
            removeWarrantyClaim: Actions.removeWarrantyClaim,
            getWarrantyClaimPaginationData: Actions.getWarrantyClaimPaginationData,
            toggleStarredWarrantyClaim: Actions.toggleStarredWarrantyClaim,
            toggleStarredWarrantyClaims: Actions.toggleStarredWarrantyClaims,
            setWarrantyClaimsStarred: Actions.setWarrantyClaimsStarred,
            setWarrantyClaimsUnstarred: Actions.setWarrantyClaimsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimApp}) {
    return {
        warrantyClaims: warrantyClaimApp.warrantyClaim.entities,
        totalPages: warrantyClaimApp.warrantyClaim.pages,
        selectedWarrantyClaimIds: warrantyClaimApp.warrantyClaim.selectedWarrantyClaimIds,
        searchText: warrantyClaimApp.warrantyClaim.searchText,
        user: warrantyClaimApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyClaimsList)
);
