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

class SurveysList extends Component {
    state = {
        selectedSurveysMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedSurveyMenu = event => {
        this.setState({selectedSurveysMenu: event.currentTarget});
    };

    closeSelectedSurveysMenu = () => {
        this.setState({selectedSurveysMenu: null});
    };

    render() {
        const {
            surveys,
            searchText,
            selectedSurveyIds,
            openEditSurveyDialog,
            removeSurveys,
            removeSurvey,
            setSurveysUnstarred,
            setSurveysStarred
        } = this.props;
        const data = this.getFilteredArray(surveys, searchText);
        const {selectedSurveysMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no survey!
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
                                    openEditSurveyDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedSurveyIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedSurveysMenu ? 'selectedSurveysMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedSurveyMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedSurveysMenu"
                                            anchorEl={selectedSurveysMenu}
                                            open={Boolean(selectedSurveysMenu)}
                                            onClose={this.closeSelectedSurveysMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeSurveys(selectedSurveyIds);
                                                        this.closeSelectedSurveysMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSurveysStarred(selectedSurveyIds);
                                                        this.closeSelectedSurveysMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSurveysUnstarred(selectedSurveyIds);
                                                        this.closeSelectedSurveysMenu();
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
                            width: 80,
                            accessor: 'id',
                            // filterable: true,
                            // className: 'font-bold'
                            className: "justify-center",
                        },
                        {
                            Header: 'Survey Name',
                            accessor: 'name',
                            filterable: true,
                            className: 'font-bold',
                            // className: "justify-center",
                        },
                        {
                            Header: 'Add/Edit Fields',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            ev.stopPropagation();
                                            window.location.href = "surveyAttribute/" + (row.original.id);
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </div>
                            )
                        },
                        {
                            Header: 'Delete Survey',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete ' + row.original.name + ' Survey?')) {
                                                ev.stopPropagation();
                                                removeSurvey(row.original.id);
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
                    noDataText="No survey found"
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getSurveys: Actions.getSurveys,
            toggleInSelectedSurveys: Actions.toggleInSelectedSurveys,
            selectAllSurveys: Actions.selectAllSurveys,
            deSelectAllSurveys: Actions.deSelectAllSurveys,
            openEditSurveyDialog: Actions.openEditSurveyDialog,
            removeSurveys: Actions.removeSurveys,
            removeSurvey: Actions.removeSurvey,
            toggleStarredSurvey: Actions.toggleStarredSurvey,
            toggleStarredSurveys: Actions.toggleStarredSurveys,
            setSurveysStarred: Actions.setSurveysStarred,
            setSurveysUnstarred: Actions.setSurveysUnstarred
        },
        dispatch
    );
}

function mapStateToProps({surveysApp}) {
    return {
        surveys: surveysApp.surveys.entities,
        selectedSurveyIds: surveysApp.surveys.selectedSurveyIds,
        searchText: surveysApp.surveys.searchText,
        user: surveysApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SurveysList)
);
