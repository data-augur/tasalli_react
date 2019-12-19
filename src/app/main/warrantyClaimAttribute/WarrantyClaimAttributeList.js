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


class WarrantyClaimAttributesList extends Component {
    state = {
        selectedWarrantyClaimAttributesMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyClaimAttributeMenu = event => {
        this.setState({selectedWarrantyClaimAttributesMenu: event.currentTarget});
    };

    closeSelectedWarrantyClaimAttributesMenu = () => {
        this.setState({selectedWarrantyClaimAttributesMenu: null});
    };

    render() {
        const {
            warrantyClaimAttributes,
            searchText,
            selectedWarrantyClaimAttributeIds,

            openEditWarrantyClaimAttributeDialog,
            removeWarrantyClaimAttributes,
            removeWarrantyClaimAttribute,
            setWarrantyClaimAttributesUnstarred,
            setWarrantyClaimAttributesStarred
        } = this.props;
        const data = this.getFilteredArray(warrantyClaimAttributes, searchText);
        const {selectedWarrantyClaimAttributesMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no warranty registration attribute!
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
                                    openEditWarrantyClaimAttributeDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyClaimAttributeIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyClaimAttributesMenu ? 'selectedWarrantyClaimAttributesMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyClaimAttributeMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyClaimAttributesMenu"
                                            anchorEl={selectedWarrantyClaimAttributesMenu}
                                            open={Boolean(selectedWarrantyClaimAttributesMenu)}
                                            onClose={this.closeSelectedWarrantyClaimAttributesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyClaimAttributes(selectedWarrantyClaimAttributeIds);
                                                        this.closeSelectedWarrantyClaimAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimAttributesStarred(selectedWarrantyClaimAttributeIds);
                                                        this.closeSelectedWarrantyClaimAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyClaimAttributesUnstarred(selectedWarrantyClaimAttributeIds);
                                                        this.closeSelectedWarrantyClaimAttributesMenu();
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
                            accessor: 'warrantyClaimForm_Id',
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
                                            if (window.confirm('Are you sure to delete ' + row.original.field_name + ' warranty claim attribute with values?')) {
                                                ev.stopPropagation();
                                                removeWarrantyClaimAttribute(row.original.id);
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
            getWarrantyClaimAttributes: Actions.getWarrantyClaimAttribute,
            toggleInSelectedWarrantyClaimAttributes: Actions.toggleInSelectedWarrantyClaimAttributes,
            selectAllWarrantyClaimAttributes: Actions.selectAllWarrantyClaimAttributes,
            deSelectAllWarrantyClaimAttributes: Actions.deSelectAllWarrantyClaimAttributes,
            openEditWarrantyClaimAttributeDialog: Actions.openEditWarrantyClaimAttributeDialog,
            removeWarrantyClaimAttributes: Actions.removeWarrantyClaimAttributes,
            removeWarrantyClaimAttribute: Actions.removeWarrantyClaimAttribute,
            toggleStarredWarrantyClaimAttribute: Actions.toggleStarredWarrantyClaimAttribute,
            toggleStarredWarrantyClaimAttributes: Actions.toggleStarredWarrantyClaimAttributes,
            setWarrantyClaimAttributesStarred: Actions.setWarrantyClaimAttributesStarred,
            setWarrantyClaimAttributesUnstarred: Actions.setWarrantyClaimAttributesUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimAttributeApp}) {
    return {
        warrantyClaimAttributes: warrantyClaimAttributeApp.warrantyClaimAttribute.entities,
        selectedWarrantyClaimAttributeIds: warrantyClaimAttributeApp.warrantyClaimAttribute.selectedWarrantyClaimAttributeIds,
        searchText: warrantyClaimAttributeApp.warrantyClaimAttribute.searchText,
        user: warrantyClaimAttributeApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyClaimAttributesList)
);
