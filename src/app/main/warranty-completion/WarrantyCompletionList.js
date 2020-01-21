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

class WarrantyCompletionsList extends Component {
    state = {
        selectedWarrantyCompletionsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedWarrantyCompletionMenu = event => {
        this.setState({selectedWarrantyCompletionsMenu: event.currentTarget});
    };

    closeSelectedWarrantyCompletionsMenu = () => {
        this.setState({selectedWarrantyCompletionsMenu: null});
    };

    render() {
        const {
            warrantyCompletions,
            searchText,
            selectedWarrantyCompletionIds,

            openEditWarrantyCompletionDialog,
            removeWarrantyCompletions,
            removeWarrantyCompletion,
            setWarrantyCompletionsUnstarred,
            setWarrantyCompletionsStarred,
            getWarrantyCompletionPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(warrantyCompletions, searchText);
        const {selectedWarrantyCompletionsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Warranty completion form!
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
                                    openEditWarrantyCompletionDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedWarrantyCompletionIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedWarrantyCompletionsMenu ? 'selectedWarrantyCompletionsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedWarrantyCompletionMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedWarrantyCompletionsMenu"
                                            anchorEl={selectedWarrantyCompletionsMenu}
                                            open={Boolean(selectedWarrantyCompletionsMenu)}
                                            onClose={this.closeSelectedWarrantyCompletionsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeWarrantyCompletions(selectedWarrantyCompletionIds);
                                                        this.closeSelectedWarrantyCompletionsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyCompletionsStarred(selectedWarrantyCompletionIds);
                                                        this.closeSelectedWarrantyCompletionsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setWarrantyCompletionsUnstarred(selectedWarrantyCompletionIds);
                                                        this.closeSelectedWarrantyCompletionsMenu();
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
                            Header: 'Warranty Completion Form',
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
                            Header: '',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete ' + row.original.formName + ' Warranty Completion?')) {
                                                ev.stopPropagation();
                                                removeWarrantyCompletion(row.original.id);
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
                    noDataText="No Warranty completion form found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getWarrantyCompletionPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getWarrantyCompletions: Actions.getWarrantyCompletion,
            toggleInSelectedWarrantyCompletions: Actions.toggleInSelectedWarrantyCompletions,
            selectAllWarrantyCompletions: Actions.selectAllWarrantyCompletions,
            deSelectAllWarrantyCompletions: Actions.deSelectAllWarrantyCompletions,
            openEditWarrantyCompletionDialog: Actions.openEditWarrantyCompletionDialog,
            removeWarrantyCompletions: Actions.removeWarrantyCompletions,
            removeWarrantyCompletion: Actions.removeWarrantyCompletion,
            getWarrantyCompletionPaginationData: Actions.getWarrantyCompletionPaginationData,
            toggleStarredWarrantyCompletion: Actions.toggleStarredWarrantyCompletion,
            toggleStarredWarrantyCompletions: Actions.toggleStarredWarrantyCompletions,
            setWarrantyCompletionsStarred: Actions.setWarrantyCompletionsStarred,
            setWarrantyCompletionsUnstarred: Actions.setWarrantyCompletionsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({warrantyCompletionApp}) {
    return {
        warrantyCompletions: warrantyCompletionApp.warrantyCompletion.entities,
        totalPages: warrantyCompletionApp.warrantyCompletion.pages,
        selectedWarrantyCompletionIds: warrantyCompletionApp.warrantyCompletion.selectedWarrantyCompletionIds,
        searchText: warrantyCompletionApp.warrantyCompletion.searchText,
        user: warrantyCompletionApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WarrantyCompletionsList)
);
