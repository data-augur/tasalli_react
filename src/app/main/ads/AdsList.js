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

class AdsList extends Component {
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
            ads,
            searchText,
            selectedAdIds,

            openEditAdDialog,
            removeAds,
            // removeAds,
            setAdsUnstarred,
            setAdsStarred,
            getAdsPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(ads, searchText);
        const {selectedAdsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no ads!
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
                                    openEditAdDialog(rowInfo.original);
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
                                                        removeAds(selectedAdIds);
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
                                    src={row.value}
                                />
                            ),
                            className: 'justify-center',
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: 'Type',
                            accessor: 'type',
                            filterable: false,
                            className: 'font-bold'
                            // className: "justify-center",
                        },
                        {
                            Header: 'From',
                            accessor: 'time_from',
                            // filterable: true,  moment('time_from').format('YYYY-MM-DD hh:mm')
                            className: 'justify-center',
                            sortDirection: 'ascending'
                            // className: "justify-center",
                        },
                        {
                            Header: 'To',
                            accessor: 'time_to',
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
                                                removeAds(row.original.id);
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
                    noDataText="No ads found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getAdsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getAds: Actions.getAds,
            toggleInSelectedAds: Actions.toggleInSelectedAds,
            selectAllAds: Actions.selectAllAds,
            deSelectAllAds: Actions.deSelectAllAds,
            openEditAdDialog: Actions.openEditAdDialog,
            removeAds: Actions.removeAds,
            // removeAds: Actions.removeAds,
            getAdsPaginationData: Actions.getAdsPaginationData,
            toggleStarredAd: Actions.toggleStarredAd,
            toggleStarredAds: Actions.toggleStarredAds,
            setAdsStarred: Actions.setAdsStarred,
            setAdsUnstarred: Actions.setAdsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({adsApp}) {
    return {
        ads: adsApp.ads.entities,
        selectedAdIds: adsApp.ads.selectedAdIds,
        totalPages: adsApp.ads.pages,
        searchText: adsApp.ads.searchText,
        user: adsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdsList)
);
