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
import moment from "moment";

class BannerAdsList extends Component {
    state = {
        selectedAdsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedAdMenu = event => {
        this.setState({selectedAdsMenu: event.currentTarget});
    };

    closeSelectedAdsMenu = () => {
        this.setState({selectedAdsMenu: null});
    };

    render() {
        const {
            bannerAds,
            searchText,
            selectedAdIds,

            openEditBannerAdDialog,
            removeBannerAds,
            // removeAds,
            setAdsUnstarred,
            setAdsStarred,
            getBannerAdsPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(bannerAds, searchText);
        const {selectedAdsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no banner Ads!
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
                                    openEditBannerAdDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedAdIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedAdsMenu ? 'selectedAdsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedAdMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedAdsMenu"
                                            anchorEl={selectedAdsMenu}
                                            open={Boolean(selectedAdsMenu)}
                                            onClose={this.closeSelectedAdsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeBannerAds(selectedAdIds);
                                                        this.closeSelectedAdsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAdsStarred(selectedAdIds);
                                                        this.closeSelectedAdsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAdsUnstarred(selectedAdIds);
                                                        this.closeSelectedAdsMenu();
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
                                    // src="http:\\localhost:5000\images\bannerImage\bannerImage2020-02-13-16-34-10.jpg"
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
                            Header: 'Notification',
                            width: 50,
                            accessor: 'notification_id',
                            show: false,
                            // filterable: true,
                            // className: 'font-bold'
                            className: "justify-center",
                        },
                        {
                            Header: 'Name',
                            accessor: 'name',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'Start Time',
                            id: 'startTime',
                            // accessor: 'startTime',
                            accessor: d => {
                                return moment(d.startTime)
                                    .local()
                                    .format("DD-MM-YYYY hh:mm:ss a")
                            },
                            filterable: false,
                            className: 'justify-center',
                        },
                        {
                            Header: 'End Time',
                            id: 'endTime',
                            accessor: d => {
                                return moment(d.endTime)
                                    .local()
                                    .format("DD-MM-YYYY hh:mm:ss a")
                            },
                            filterable: false,
                            className: 'justify-center'
                        },
                        {
                            Header: 'Duration',
                            accessor: 'duration',
                            // filterable: true,
                            className: 'justify-center'
                            // className: "justify-center",
                        },
                        // {
                        //       Header: 'Link',
                        //       accessor: 'video_link',
                        //       // filterable: true,
                        //       className: 'justify-center',
                        //       // Cell: e =><a href={e.video_link}> {e.video_link} </a>
                        //     // className: "justify-center",
                        // },
                        {
                            Header: '',
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete Ad?')) {
                                                ev.stopPropagation();
                                                removeBannerAds(row.original.id);
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
                    noDataText="No banner  ads found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getBannerAdsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getBannerAds: Actions.getBannerAds,
            toggleInSelectedBannerAds: Actions.toggleInSelectedAds,
            selectAllBannerAds: Actions.selectAllBannerAds,
            deSelectAllBannerAds: Actions.deSelectAllBannerAds,
            openEditBannerAdDialog: Actions.openEditBannerAdDialog,
            removeBannerAds: Actions.removeBannerAds,
            // removeAds: Actions.removeAds,
            getBannerAdsPaginationData: Actions.getBannerAdsPaginationData,
            toggleStarredBannerAd: Actions.toggleStarredAd,
            toggleStarredBannerAds: Actions.toggleStarredBannerAds,
            setBannerAdsStarred: Actions.setBannerAdsStarred,
            setBannerAdsUnstarred: Actions.setBannerAdsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({bannerAdsApp}) {
    return {
        bannerAds: bannerAdsApp.bannerAds.entities,
        selectedAdIds: bannerAdsApp.bannerAds.selectedAdIds,
        totalPages: bannerAdsApp.bannerAds.pages,
        searchText: bannerAdsApp.bannerAds.searchText,
        user: bannerAdsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BannerAdsList)
);
