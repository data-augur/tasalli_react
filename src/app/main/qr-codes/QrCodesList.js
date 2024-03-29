import React, { Component} from 'react';
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
import moment from "moment";
class QrcodesList extends Component {
    state = {
        selectedQrcodesMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedQrcodeMenu = event => {
        this.setState({selectedQrcodesMenu: event.currentTarget});
    };

    closeSelectedQrcodesMenu = () => {
        this.setState({selectedQrcodesMenu: null});
    };

    render() {
        const {
            qrcodes,
            searchText,
            selectedQrcodeIds,
            openEditQrcodeDialog,
            removeQrcodes,
            setQrcodesUnstarred,
            setQrcodesStarred,
            getQrcodesPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(qrcodes, searchText);
        const {selectedQrcodesMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no qrcode users!
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
                                    openEditQrcodeDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedQrcodeIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedQrcodesMenu ? 'selectedQrcodesMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedQrcodeMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedQrcodesMenu"
                                            anchorEl={selectedQrcodesMenu}
                                            open={Boolean(selectedQrcodesMenu)}
                                            onClose={this.closeSelectedQrcodesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeQrcodes(selectedQrcodeIds);
                                                        this.closeSelectedQrcodesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setQrcodesStarred(selectedQrcodeIds);
                                                        this.closeSelectedQrcodesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setQrcodesUnstarred(selectedQrcodeIds);
                                                        this.closeSelectedQrcodesMenu();
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
                            width: 1,
                            accessor: 'id',
                            show: false,
                            // filterable: true,
                            // className: 'font-bold'
                            className: "justify-center",
                        },
                        {
                            Header: 'Phone Number',
                            accessor: 'phoneNumber',
                            width: 150,
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Code Type',
                            accessor: 'code_type',
                            width: 150,
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Data Type',
                            accessor: 'data_type',
                            width: 150,
                            filterable: false,
                            className: 'font-bold justify-center'
                            // className: "justify-center",
                        },
                        // {
                        //     Header: 'Data',
                        //     accessor: 'data',
                        //     width: 250,
                        //     filterable: false,
                        //     className: 'justify-center'
                        //     // className: "justify-center",
                        // },
                        {
                            Header: 'Latitude',
                            accessor: 'latitude',
                            // filterable: true,
                            width: 150,
                            className: ' justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Longitude',
                            accessor: 'longitude',
                            // filterable: true,
                            width: 150,
                            className: ' justify-center'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Time',
                            // filterable: true,
                            className: ' justify-center',
                            width: 170,
                            id: 'scan_time',
                            accessor: d => {
                                return moment(d.scan_time)
                                    .local()
                                    .format("DD-MM-YYYY hh:mm:ss a")
                            },
                            // className: "justify-center",
                        }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="No qrcode found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getQrcodesPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getQrcodes: Actions.getQrcodes,
            toggleInSelectedQrcodes: Actions.toggleInSelectedQrcodes,
            selectAllQrcodes: Actions.selectAllQrcodes,
            deSelectAllQrcodes: Actions.deSelectAllQrcodes,
            openEditQrcodeDialog: Actions.openEditQrcodeDialog,
            removeQrcodes: Actions.removeQrcodes,
            removeQrcode: Actions.removeQrcode,
            getQrcodesPaginationData: Actions.getQrcodesPaginationData,
            toggleStarredQrcode: Actions.toggleStarredQrcode,
            toggleStarredQrcodes: Actions.toggleStarredQrcodes,
            setQrcodesStarred: Actions.setQrcodesStarred,
            setQrcodesUnstarred: Actions.setQrcodesUnstarred
        },
        dispatch
    );
}

function mapStateToProps({qrcodesApp}) {
    return {
        qrcodes: qrcodesApp.qrcodes.entities,
        totalPages: qrcodesApp.qrcodes.pages,
        selectedQrcodeIds: qrcodesApp.qrcodes.selectedQrcodeIds,
        searchText: qrcodesApp.qrcodes.searchText,
        user: qrcodesApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(QrcodesList)
);
