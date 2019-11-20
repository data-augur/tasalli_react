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

class ContactsList extends Component {
    state = {
        selectedContactsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = event => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };

    render() {
        const {
            contacts,
            searchText,
            selectedContactIds,
            
            openEditContactDialog,
            removeContacts,
            removeWarrantyRegistrationAttribute,
            setContactsUnstarred,
            setContactsStarred
        } = this.props;
        const data = this.getFilteredArray(contacts, searchText);
        const {selectedContactsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no survey attribute!
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
                                    openEditContactDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[
                       
                        {
                            Header: () =>
                                selectedContactIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedContactsMenu ? 'selectedContactsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedContactMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedContactsMenu"
                                            anchorEl={selectedContactsMenu}
                                            open={Boolean(selectedContactsMenu)}
                                            onClose={this.closeSelectedContactsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeContacts(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsStarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsUnstarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
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
                            width: 50,
                            accessor: 'id',
                            show: false,
                            // filterable: true,
                            // className: 'font-bold'
                            className: "justify-center",
                        },
                        {
                            Header: 'Field Name',
                            accessor: 'field_name',
                            filterable: true,
                            className: 'font-bold',
                            // className: "justify-center",
                        },
                        {
                            Header: '',
                            accessor: 'warrantyRegistrationForm_Id',
                            width: 10,
                            show: false,
                            // filterable: true,
                            className: 'font-bold',
                            // className: "justify-center",
                        },
                        {
                            Header: 'Field Type',
                            accessor: 'field_type',
                            width: 80,
                            // filterable: true,
                            className: 'font-bold',
                            // className: "justify-center",
                        },
                        {
                            Header: 'Options',
                            accessor: 'options',
                            show: false,
                            width: 80,
                            // filterable: true,
                            className: 'font-bold',
                            // className: "justify-center",
                        },
                        // {
                        //     Header: 'Add/Edit Values',
                        //     width: 125,
                        //     Cell: row => (
                        //         <div className="flex items-center justify-center">
                        //             {/*this.state.type==='video'*/}
                        //             { this.state.type==='video' ? (
                        //                 <IconButton
                        //                     onClick={ev => {
                        //                         ev.stopPropagation();
                        //                          window.location.href="surveyAttributeValues/"+(row.original.id);
                        //                     }}
                        //                 >
                        //                     <Icon>edit</Icon>
                        //                 </IconButton>
                        //             ) : null}
                        //         </div>
                        //     )
                        // },
                        {
                            Header: 'Delete Field',
                            width: 125,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            ev.stopPropagation();
                                            removeWarrantyRegistrationAttribute(row.original.id);
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
                    noDataText="No survey attribute found"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getContacts: Actions.getWarrantyRegistrationAttribute,
            toggleInSelectedContacts: Actions.toggleInSelectedContacts,
            selectAllContacts: Actions.selectAllContacts,
            deSelectAllContacts: Actions.deSelectAllContacts,
            openEditContactDialog: Actions.openEditContactDialog,
            removeContacts: Actions.removeContacts,
            removeWarrantyRegistrationAttribute: Actions.removeWarrantyRegistrationAttribute,
            toggleStarredContact: Actions.toggleStarredContact,
            toggleStarredContacts: Actions.toggleStarredContacts,
            setContactsStarred: Actions.setContactsStarred,
            setContactsUnstarred: Actions.setContactsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegistrationAttributeApp}) {
    return {
        contacts: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.entities,
        selectedContactIds: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.selectedContactIds,
        searchText: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.searchText,
        user: warrantyRegistrationAttributeApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ContactsList)
);
