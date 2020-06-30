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

class BrandsList extends Component {
    state = {
        selectedBrandsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedBrandMenu = event => {
        this.setState({selectedBrandsMenu: event.currentTarget});
    };

    closeSelectedBrandsMenu = () => {
        this.setState({selectedBrandsMenu: null});
    };

    render() {
        const {
            brands,
            searchText,
            selectedBrandIds,
            openEditBrandDialog,
            removeBrands,
            removeBrand,
            setBrandsUnstarred,
            setBrandsStarred,
            getBrandsPaginationData,
            totalPages
        } = this.props;
        const data = this.getFilteredArray(brands, searchText);
        const {selectedBrandsMenu} = this.state;

        if (!data && data.length === 0) {
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
                    getTrProps={(state, rowInfo) => {
                        return {
                            className: 'cursor-pointer',
                            onClick: () => {
                                if (rowInfo) {
                                    openEditBrandDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        {
                            Header: () =>
                                selectedBrandIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={
                                                selectedBrandsMenu ? 'selectedBrandsMenu' : null
                                            }
                                            aria-haspopup="true"
                                            onClick={this.openSelectedBrandMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedBrandsMenu"
                                            anchorEl={selectedBrandsMenu}
                                            open={Boolean(selectedBrandsMenu)}
                                            onClose={this.closeSelectedBrandsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeBrands(selectedBrandIds);
                                                        this.closeSelectedBrandsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setBrandsStarred(selectedBrandIds);
                                                        this.closeSelectedBrandsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setBrandsUnstarred(selectedBrandIds);
                                                        this.closeSelectedBrandsMenu();
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
                                    alt={row.name}
                                    src={row.image_url}
                                />
                            ),
                            className: 'justify-center',
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: 'Brand',
                            accessor: 'name',
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
                            filterable: false,
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        hidden={localStorage.getItem('Role') !== 'superAdmin'}
                                        disabled={localStorage.getItem('Role') !== 'superAdmin'}
                                        onClick={ev => {
                                            if (window.confirm('Are you sure to delete ' + row.original.name + ' brand?')) {
                                                ev.stopPropagation();
                                                removeBrand(row.original.id);
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
                    noDataText="No brand found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[ 20, 25, 50, 100, -1  ]}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        getBrandsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getBrands: Actions.getBrands,
            toggleInSelectedBrands: Actions.toggleInSelectedBrands,
            selectAllBrands: Actions.selectAllBrands,
            deSelectAllBrands: Actions.deSelectAllBrands,
            openEditBrandDialog: Actions.openEditBrandDialog,
            removeBrands: Actions.removeBrands,
            removeBrand: Actions.removeBrand,
            getBrandsPaginationData: Actions.getBrandsPaginationData,
            toggleStarredBrand: Actions.toggleStarredBrand,
            toggleStarredBrands: Actions.toggleStarredBrands,
            setBrandsStarred: Actions.setBrandsStarred,
            setBrandsUnstarred: Actions.setBrandsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({brandsApp}) {
    return {
        brands: brandsApp.brands.entities,
        totalPages: brandsApp.brands.pages,
        selectedBrandIds: brandsApp.brands.selectedBrandIds,
        searchText: brandsApp.brands.searchText,
        user: brandsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BrandsList)
);
