import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';

class LogsList extends Component {
    state = {
        selectedLogsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    // openSelectedLogMenu = event => {
    //     this.setState({selectedLogsMenu: event.currentTarget});
    // };
    //
    // closeSelectedLogsMenu = () => {
    //     this.setState({selectedLogsMenu: null});
    // };

    render() {
        const {logs, searchText ,
            getLogsPaginationData,
            totalPages} = this.props;
        const data = this.getFilteredArray(logs, searchText);
        // const {selectedLogsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Logs Data!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={() => {
                        return {
                            className: 'cursor-pointer',
                        };
                    }}
                    data={data}
                    // sorted={[
                    //     {
                    //         id: 'time',
                    //         desc: true
                    //     }
                    // ]}
                    columns={[

                        // {
                        //     Header: () =>
                        //         selectedLogIds.length > 0 && (
                        //             <React.Fragment>
                        //                 <IconButton
                        //                     aria-owns={
                        //                         selectedLogsMenu ? 'selectedLogsMenu' : null
                        //                     }
                        //                     aria-haspopup="true"
                        //                     onClick={this.openSelectedLogMenu}
                        //                 >
                        //                     <Icon>more_horiz</Icon>
                        //                 </IconButton>
                        //                 <Menu
                        //                     id="selectedLogsMenu"
                        //                     anchorEl={selectedLogsMenu}
                        //                     open={Boolean(selectedLogsMenu)}
                        //                     onClose={this.closeSelectedLogsMenu}
                        //                 >
                        //                     <MenuList>
                        //                         <MenuItem
                        //
                        //                         >
                        //
                        //                             <ListItemText inset primary="Remove"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setLogsStarred(selectedLogIds);
                        //                                 this.closeSelectedLogsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>star</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Starred"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setLogsUnstarred(selectedLogIds);
                        //                                 this.closeSelectedLogsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>star_border</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Unstarred"/>
                        //                         </MenuItem>
                        //                     </MenuList>
                        //                 </Menu>
                        //             </React.Fragment>
                        //         ),
                        //     accessor: 'avatar',
                        //     Cell: row => (
                        //         <Avatar
                        //             className="mr-8"
                        //             alt={row.original.name}
                        //             src={row.value}
                        //         />
                        //     ),
                        //     className: 'justify-center',
                        //     width: 64,
                        //     sortable: false
                        // },
                        {
                            Header: 'Phone Number',
                            accessor: 'phoneNumber',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'SKU Code',
                            accessor: 'code',
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Status',
                            accessor: 'status',
                            width: 220,
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Latitude',
                            accessor: 'latitude',
                            // filterable: true,
                            className: ' justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Longitude',
                            accessor: 'longitude',
                            // filterable: true,
                            className: ' justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Time',
                            accessor: 'time',
                            // filterable: true,
                            className: ' justify-center'
                            // className: "justify-center",
                        }
                        // {
                        //   Header: '',
                        //   width: 128,
                        //   Cell: row => (
                        //     <div className="flex items-center justify-center">
                        //       <IconButton
                        //         onClick={ev => {
                        //          if (window.confirm('Are you sure to delete Log?')) {
                        //               ev.stopPropagation();
                        //              removeBrand(row.original.id);
                        //            }
                        //         }}
                        //       >
                        //         <Icon>delete</Icon>
                        //       </IconButton>
                        //     </div>
                        //   )
                        // }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="No logs found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        // this.setState({loading: true});
                        getLogsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
                        // this.setState({loading: false});
                    }}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getLogs: Actions.getLogs,
            toggleInSelectedLogs: Actions.toggleInSelectedLogs,
            selectAllLogs: Actions.selectAllLogs,
            deSelectAllLogs: Actions.deSelectAllLogs,
            openEditLogDialog: Actions.openEditLogDialog,
            getLogsPaginationData: Actions.getLogsPaginationData,
            toggleStarredLog: Actions.toggleStarredLog,
            toggleStarredLogs: Actions.toggleStarredLogs,
            setLogsStarred: Actions.setLogsStarred,
            setLogsUnstarred: Actions.setLogsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({logsApp}) {
    return {
        logs: logsApp.logs.entities,
        totalPages: logsApp.logs.pages,
        selectedLogIds: logsApp.logs.selectedLogIds,
        searchText: logsApp.logs.searchText,
        user: logsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LogsList)
);
