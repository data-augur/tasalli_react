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

class WarrantyRegistrationAttributesList extends Component {
    state = {
        selectedWarrantyRegistrationAttributesMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyRegistrationAttributeMenu = event => {
        this.setState({selectedWarrantyRegistrationAttributesMenu: event.currentTarget});
    };

    closeSelectedWarrantyRegistrationAttributesMenu = () => {
        this.setState({selectedWarrantyRegistrationAttributesMenu: null});
    };

    render() {
        const {
            warrantyRegistrationAttributes,
            searchText,
            selectedWarrantyRegistrationAttributeIds,
            
            openEditWarrantyRegistrationAttributeDialog,
            removeWarrantyRegistrationAttributes,
            removeWarrantyRegistrationAttribute,
            setWarrantyRegistrationAttributesUnstarred,
            setWarrantyRegistrationAttributesStarred
        } = this.props;
        const data = this.getFilteredArray(warrantyRegistrationAttributes, searchText);
        const {selectedWarrantyRegistrationAttributesMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Warranty Registration attribute!
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
                                    openEditWarrantyRegistrationAttributeDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[
                       
                        {
                            Header: () =>
                                selectedWarrantyRegistrationAttributeIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyRegistrationAttributesMenu ? 'selectedWarrantyRegistrationAttributesMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyRegistrationAttributeMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyRegistrationAttributesMenu"
                                            anchorEl={selectedWarrantyRegistrationAttributesMenu}
                                            open={Boolean(selectedWarrantyRegistrationAttributesMenu)}
                                            onClose={this.closeSelectedWarrantyRegistrationAttributesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyRegistrationAttributes(selectedWarrantyRegistrationAttributeIds);
                                                        this.closeSelectedWarrantyRegistrationAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistrationAttributesStarred(selectedWarrantyRegistrationAttributeIds);
                                                        this.closeSelectedWarrantyRegistrationAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyRegistrationAttributesUnstarred(selectedWarrantyRegistrationAttributeIds);
                                                        this.closeSelectedWarrantyRegistrationAttributesMenu();
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
                                            if (window.confirm('Are you sure to delete '+this.state.field_name+' warranty registration attribute with values?')) {
                                                ev.stopPropagation();
                                                removeWarrantyRegistrationAttribute(row.original.id);
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
                    noDataText="No warranty registration attribute found"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWarrantyRegistrationAttributes: Actions.getWarrantyRegistrationAttribute,
            toggleInSelectedWarrantyRegistrationAttributes: Actions.toggleInSelectedWarrantyRegistrationAttributes,
            selectAllWarrantyRegistrationAttributes: Actions.selectAllWarrantyRegistrationAttributes,
            deSelectAllWarrantyRegistrationAttributes: Actions.deSelectAllWarrantyRegistrationAttributes,
            openEditWarrantyRegistrationAttributeDialog: Actions.openEditWarrantyRegistrationAttributeDialog,
            removeWarrantyRegistrationAttributes: Actions.removeWarrantyRegistrationAttributes,
            removeWarrantyRegistrationAttribute: Actions.removeWarrantyRegistrationAttribute,
            toggleStarredWarrantyRegistrationAttribute: Actions.toggleStarredWarrantyRegistrationAttribute,
            toggleStarredWarrantyRegistrationAttributes: Actions.toggleStarredWarrantyRegistrationAttributes,
            setWarrantyRegistrationAttributesStarred: Actions.setWarrantyRegistrationAttributesStarred,
            setWarrantyRegistrationAttributesUnstarred: Actions.setWarrantyRegistrationAttributesUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegistrationAttributeApp}) {
    return {
        warrantyRegistrationAttributes: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.entities,
        selectedWarrantyRegistrationAttributeIds: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.selectedWarrantyRegistrationAttributeIds,
        searchText: warrantyRegistrationAttributeApp.warrantyRegistrationAttribute.searchText,
        user: warrantyRegistrationAttributeApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyRegistrationAttributesList)
);
