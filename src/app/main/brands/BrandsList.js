import React, { Component } from 'react';
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
import { FuseUtils, FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
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
    this.setState({ selectedBrandsMenu: event.currentTarget });
  };

  closeSelectedBrandsMenu = () => {
    this.setState({ selectedBrandsMenu: null });
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
      setBrandsStarred
    } = this.props;
    const data = this.getFilteredArray(brands, searchText);
    const { selectedBrandsMenu } = this.state;

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
          getTrProps={(state, rowInfo, column) => {
            return {
              className: 'cursor-pointer',
              onClick: (e, handleOriginal) => {
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
                          <ListItemText inset primary="Remove" />
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
                          <ListItemText inset primary="Starred" />
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
                          <ListItemText inset primary="Unstarred" />
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
              Header: 'Brand',
              accessor: 'name',
              filterable: true,
              className: 'font-bold'
              // className: "justify-center",
            },
            {
              Header: 'Company',
              accessor: 'companyName',
              filterable: true,
              className: 'font-bold justify-center'
              // className: "justify-center",
            },

            {
              Header: '',
              width: 128,
              Cell: row => (
                <div className="flex items-center justify-center">
                  <IconButton
                      hidden={localStorage.getItem('Role')!=='superAdmin'}
                      disabled= {localStorage.getItem('Role')!=='superAdmin'}
                    onClick={ev => {
                        if (window.confirm('Are you sure to delete '+row.original.name+' brand?')) {
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
          defaultPageSize={10}
          resizable={false}
          noDataText="No brand found"
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
      toggleStarredBrand: Actions.toggleStarredBrand,
      toggleStarredBrands: Actions.toggleStarredBrands,
      setBrandsStarred: Actions.setBrandsStarred,
      setBrandsUnstarred: Actions.setBrandsUnstarred
    },
    dispatch
  );
}

function mapStateToProps({ brandsApp }) {
  return {
    brands: brandsApp.brands.entities,
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
