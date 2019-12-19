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

class WarrantyRegistrationsList extends Component {
    state = {
        selectedWarrantyRegistrationsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyRegistrationMenu = event => {
        this.setState({selectedWarrantyRegistrationsMenu: event.currentTarget});
    };

    closeSelectedWarrantyRegistrationsMenu = () => {
        this.setState({selectedWarrantyRegistrationsMenu: null});
    };

    render() {
        const {
            warrantyRegistrations,
            searchText,
            selectedWarrantyRegistrationIds,
            openEditWarrantyRegistrationDialog,
            removeWarrantyRegistrations,
            removeWarrantyRegistration,
            setWarrantyRegistrationsUnstarred,
            setWarrantyRegistrationsStarred
        } = this.props;
        const data = this.getFilteredArray(warrantyRegistrations, searchText);
        const {selectedWarrantyRegistrationsMenu} = this.state;

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
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: 'cursor-pointer',
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    openEditWarrantyRegistrationDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyRegistrationIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyRegistrationsMenu ? 'selectedWarrantyRegistrationsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyRegistrationMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyRegistrationsMenu"
                                            anchorEl={selectedWarrantyRegistrationsMenu}
                                            open={Boolean(selectedWarrantyRegistrationsMenu)}
                                            onClose={this.closeSelectedWarrantyRegistrationsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyRegistrations(selectedWarrantyRegistrationIds);
                                                        this.closeSelectedWarrantyRegistrationsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistrationsStarred(selectedWarrantyRegistrationIds);
                                                        this.closeSelectedWarrantyRegistrationsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistrationsUnstarred(selectedWarrantyRegistrationIds);
                                                        this.closeSelectedWarrantyRegistrationsMenu();
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
                            Header: 'Warranty Registration Form',
                            accessor: 'formName',
                            filterable: true,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Company',
                            accessor: 'companyName',
                            filterable: true,
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
                                            window.location.href = "warrantyRegistrationAttribute/" + (row.original.id);
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
                                            if (window.confirm('Are you sure to delete ' + row.original.formName + ' warranty registration?')) {
                                                ev.stopPropagation();
                                                removeWarrantyRegistration(row.original.id);
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
                    noDataText="No Warranty Registration found"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWarrantyRegistrations: Actions.getWarrantyRegistration,
            toggleInSelectedWarrantyRegistrations: Actions.toggleInSelectedWarrantyRegistrations,
            selectAllWarrantyRegistrations: Actions.selectAllWarrantyRegistrations,
            deSelectAllWarrantyRegistrations: Actions.deSelectAllWarrantyRegistrations,
            openEditWarrantyRegistrationDialog: Actions.openEditWarrantyRegistrationDialog,
            removeWarrantyRegistrations: Actions.removeWarrantyRegistrations,
            removeWarrantyRegistration: Actions.removeWarrantyRegistration,
            toggleStarredWarrantyRegistration: Actions.toggleStarredWarrantyRegistration,
            toggleStarredWarrantyRegistrations: Actions.toggleStarredWarrantyRegistrations,
            setWarrantyRegistrationsStarred: Actions.setWarrantyRegistrationsStarred,
            setWarrantyRegistrationsUnstarred: Actions.setWarrantyRegistrationsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegistrationApp}) {
    return {
        warrantyRegistrations: warrantyRegistrationApp.warrantyRegistration.entities,
        selectedWarrantyRegistrationIds: warrantyRegistrationApp.warrantyRegistration.selectedWarrantyRegistrationIds,
        searchText: warrantyRegistrationApp.warrantyRegistration.searchText,
        user: warrantyRegistrationApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyRegistrationsList)
);
