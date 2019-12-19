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
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';

class WarrantyRegistersList extends Component {
    state = {
        selectedWarrantyRegistersMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyRegisterMenu = event => {
        this.setState({selectedWarrantyRegistersMenu: event.currentTarget});
    };

    closeSelectedWarrantyRegistersMenu = () => {
        this.setState({selectedWarrantyRegistersMenu: null});
    };

    render() {
        const {
            warrantyRegisters,
            searchText,
            selectedWarrantyRegisterIds,
            openEditWarrantyRegisterDialog,
            removeWarrantyRegisters,
            removeWarrantyRegister,
            setWarrantyRegistersUnstarred,
            setWarrantyRegistersStarred
        } = this.props;
        const data = this.getFilteredArray(warrantyRegisters, searchText);
        const {selectedWarrantyRegistersMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Warranty Registration Form!
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
                                    openEditWarrantyRegisterDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyRegisterIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyRegistersMenu ? 'selectedWarrantyRegistersMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyRegisterMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyRegistersMenu"
                                            anchorEl={selectedWarrantyRegistersMenu}
                                            open={Boolean(selectedWarrantyRegistersMenu)}
                                            onClose={this.closeSelectedWarrantyRegistersMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyRegisters(selectedWarrantyRegisterIds);
                                                        this.closeSelectedWarrantyRegistersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistersStarred(selectedWarrantyRegisterIds);
                                                        this.closeSelectedWarrantyRegistersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistersUnstarred(selectedWarrantyRegisterIds);
                                                        this.closeSelectedWarrantyRegistersMenu();
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
                            filterable: true,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Code',
                            accessor: 'code',
                            filterable: true,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'User Phone',
                            accessor: 'phoneNumber',
                            filterable: true,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Retailer Phone',
                            accessor: 'retailerNumber',
                            filterable: true,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Date',
                            accessor: 'date',
                            filterable: true,
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
                                            if (window.confirm('Are you sure to delete Registered Warranty?')) {
                                                ev.stopPropagation();
                                                removeWarrantyRegister(row.original.id);
                                            }
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    resizable={false}
                    noDataText="No Warranty Register"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWarrantyRegisters: Actions.getWarrantyRegister,
            toggleInSelectedWarrantyRegisters: Actions.toggleInSelectedWarrantyRegisters,
            selectAllWarrantyRegisters: Actions.selectAllWarrantyRegisters,
            deSelectAllWarrantyRegisters: Actions.deSelectAllWarrantyRegisters,
            openEditWarrantyRegisterDialog: Actions.openEditWarrantyRegisterDialog,
            removeWarrantyRegisters: Actions.removeWarrantyRegisters,
            removeWarrantyRegister: Actions.removeWarrantyRegister,
            toggleStarredWarrantyRegister: Actions.toggleStarredWarrantyRegister,
            toggleStarredWarrantyRegisters: Actions.toggleStarredWarrantyRegisters,
            setWarrantyRegistersStarred: Actions.setWarrantyRegistersStarred,
            setWarrantyRegistersUnstarred: Actions.setWarrantyRegistersUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegisterApp}) {
    return {
        warrantyRegisters: warrantyRegisterApp.warrantyRegister.entities,
        selectedWarrantyRegisterIds: warrantyRegisterApp.warrantyRegister.selectedWarrantyRegisterIds,
        searchText: warrantyRegisterApp.warrantyRegister.searchText,
        user: warrantyRegisterApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyRegistersList)
);
