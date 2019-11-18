import React, {Component} from 'react';
import {Avatar,  Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class ContactsList extends Component {

    state = {
        selectedContactsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };

    render()
    {
        const { contacts, searchText, selectedContactIds,  openEditContactDialog, removeContacts, removeBrandUser, setContactsUnstarred, setContactsStarred} = this.props;
        const data = this.getFilteredArray(contacts, searchText);
        const {selectedContactsMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no brand users!
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
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditContactDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        
                        {
                            Header   : () => (
                                selectedContactIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
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
                                )
                            ),
                            accessor : "avatar",
                            Cell     : row => (
                                <Avatar className="mr-8" alt={row.original.name} src="/static/images/avatar/user.png" />
                            ),
                            className: "justify-center",
                            width : 80,
                            sortable : false
                        },
                        {
                            width : 150,
                            Header    : "Name",
                            accessor  : "name",
                            filterable: true,
                            className : "font-bold",
                            // className: "justify-center",
                        },
                        {
                            width : 150,
                            Header    : "Email",
                            accessor  : "email",
                            filterable: true,
                            className : " justify-center",
                        },
                        {
                            width : 150,
                            Header    : "Job Title",
                            accessor  : "role",
                            filterable: true,
                            className : " justify-center",
                        },
                        {
                            width : 150,
                            Header    : "Brand",
                            accessor  : "brand_Name",
                            className : " justify-center",
                            // filterable: true
                        },
                        {
                            width : 150,
                            Header    : "Company",
                            accessor  : "company_Name",
                            className : " justify-center",
                            // filterable: true
                        },
                        {
                            width : 150,
                            Header    : "Gender",
                            accessor  : "gender",
                            filterable: true,
                            className : "justify-center",
                        },

                        {
                            width : 150,
                            Header    : "Phone",
                            accessor  : "phoneNumber",
                            className : " justify-center",
                            // filterable: true
                        },
                        {
                            Header: "",
                            width : 50,
                            Cell  : row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        hidden={localStorage.getItem('Role')!=='superAdmin'}
                                        disabled= {localStorage.getItem('Role')!=='superAdmin'}
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeBrandUser(row.original.id);
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
                    noDataText="No BrandUser found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        // getContacts             : Actions.getContacts,
        getUserData             : Actions.getUserData,
        toggleInSelectedContacts: Actions.toggleInSelectedContacts,
        selectAllContacts       : Actions.selectAllContacts,
        deSelectAllContacts     : Actions.deSelectAllContacts,
        openEditContactDialog   : Actions.openEditContactDialog,
        removeContacts          : Actions.removeContacts,
        removeBrandUser           : Actions.removeBrandUser,
        toggleStarredContact    : Actions.toggleStarredContact,
        toggleStarredContacts   : Actions.toggleStarredContacts,
        setContactsStarred      : Actions.setContactsStarred,
        setContactsUnstarred    : Actions.setContactsUnstarred
    }, dispatch);
}

function mapStateToProps({brandUserApp})
{
    return {
        contacts          : brandUserApp.brandUser.entities,
        selectedContactIds: brandUserApp.brandUser.selectedContactIds,
        searchText        : brandUserApp.brandUser.searchText,
        user              : brandUserApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsList));
