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


class SurveyAttributesList extends Component {
    state = {
        selectedSurveyAttributesMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedSurveyAttributeMenu = event => {
        this.setState({selectedSurveyAttributesMenu: event.currentTarget});
    };

    closeSelectedSurveyAttributesMenu = () => {
        this.setState({selectedSurveyAttributesMenu: null});
    };

    render() {
        const {
            surveyAttributes,
            searchText,
            selectedSurveyAttributeIds,
            
            openEditSurveyAttributeDialog,
            removeSurveyAttributes,
            removeSurveyAttribute,
            setSurveyAttributesUnstarred,
            setSurveyAttributesStarred
        } = this.props;
        const data = this.getFilteredArray(surveyAttributes, searchText);
        const {selectedSurveyAttributesMenu} = this.state;

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
                                    openEditSurveyAttributeDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[
                        
                        {
                            Header: () =>
                                selectedSurveyAttributeIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedSurveyAttributesMenu ? 'selectedSurveyAttributesMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedSurveyAttributeMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedSurveyAttributesMenu"
                                            anchorEl={selectedSurveyAttributesMenu}
                                            open={Boolean(selectedSurveyAttributesMenu)}
                                            onClose={this.closeSelectedSurveyAttributesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeSurveyAttributes(selectedSurveyAttributeIds);
                                                        this.closeSelectedSurveyAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSurveyAttributesStarred(selectedSurveyAttributeIds);
                                                        this.closeSelectedSurveyAttributesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSurveyAttributesUnstarred(selectedSurveyAttributeIds);
                                                        this.closeSelectedSurveyAttributesMenu();
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
                            accessor: 'survey_Id',
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
                                            if (window.confirm('Are you sure to delete '+row.original.field_name+' survey attribute with values?')) {
                                                ev.stopPropagation();
                                                removeSurveyAttribute(row.original.id);
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
                    noDataText="No survey attribute found"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getSurveyAttributes: Actions.getSurveyAttribute,
            toggleInSelectedSurveyAttributes: Actions.toggleInSelectedSurveyAttributes,
            selectAllSurveyAttributes: Actions.selectAllSurveyAttributes,
            deSelectAllSurveyAttributes: Actions.deSelectAllSurveyAttributes,
            openEditSurveyAttributeDialog: Actions.openEditSurveyAttributeDialog,
            removeSurveyAttributes: Actions.removeSurveyAttributes,
            removeSurveyAttribute: Actions.removeSurveyAttribute,
            toggleStarredSurveyAttribute: Actions.toggleStarredSurveyAttribute,
            toggleStarredSurveyAttributes: Actions.toggleStarredSurveyAttributes,
            setSurveyAttributesStarred: Actions.setSurveyAttributesStarred,
            setSurveyAttributesUnstarred: Actions.setSurveyAttributesUnstarred
        },
        dispatch
    );
}

function mapStateToProps({surveyAttributeApp}) {
    return {
        surveyAttributes: surveyAttributeApp.surveyAttribute.entities,
        selectedSurveyAttributeIds: surveyAttributeApp.surveyAttribute.selectedSurveyAttributeIds,
        searchText: surveyAttributeApp.surveyAttribute.searchText,
        user: surveyAttributeApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SurveyAttributesList)
);
