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

class ProductsList extends Component {
  state = {
    selectedProductsMenu: null
  };

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  openSelectedProductMenu = event => {
    this.setState({ selectedProductsMenu: event.currentTarget });
  };

  closeSelectedProductsMenu = () => {
    this.setState({ selectedProductsMenu: null });
  };

  render() {
    const {
      products,
      searchText,
      selectedProductIds,
      
      openEditProductDialog,
      removeProducts,
      removeProduct,
      setProductsUnstarred,
      setProductsStarred
    } = this.props;
    const data = this.getFilteredArray(products, searchText);
    const { selectedProductsMenu } = this.state;

    if (!data && data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no product!
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
                  openEditProductDialog(rowInfo.original);
                }
              }
            };
          }}
          data={data}
          columns={[
            
            {
              Header: () =>
                selectedProductIds.length > 0 && (
                  <React.Fragment>
                    <IconButton
                      aria-owns={
                        selectedProductsMenu ? 'selectedProductsMenu' : null
                      }
                      aria-haspopup="true"
                      onClick={this.openSelectedProductMenu}
                    >
                      <Icon>more_horiz</Icon>
                    </IconButton>
                    <Menu
                      id="selectedProductsMenu"
                      anchorEl={selectedProductsMenu}
                      open={Boolean(selectedProductsMenu)}
                      onClose={this.closeSelectedProductsMenu}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            removeProducts(selectedProductIds);
                            this.closeSelectedProductsMenu();
                          }}
                        >
                          <ListItemIcon>
                            <Icon>delete</Icon>
                          </ListItemIcon>
                          <ListItemText inset primary="Remove" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setProductsStarred(selectedProductIds);
                            this.closeSelectedProductsMenu();
                          }}
                        >
                          <ListItemIcon>
                            <Icon>star</Icon>
                          </ListItemIcon>
                          <ListItemText inset primary="Starred" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setProductsUnstarred(selectedProductIds);
                            this.closeSelectedProductsMenu();
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
              Header: 'Product Code',
              accessor: 'code',
              filterable: true,
              className: 'font-bold'
              // className: "justify-center",
            },
            {
                  Header: 'Brand',
                  accessor: 'brandName',
                  filterable: true,
                  className: 'font-bold justify-center'
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
                    onClick={ev => {

                      ev.stopPropagation();
                      removeProduct(row.original.id);
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
          noDataText="No product found"
        />
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProducts: Actions.getProducts,
      toggleInSelectedProducts: Actions.toggleInSelectedProducts,
      selectAllProducts: Actions.selectAllProducts,
      deSelectAllProducts: Actions.deSelectAllProducts,
      openEditProductDialog: Actions.openEditProductDialog,
      removeProducts: Actions.removeProducts,
      removeProduct: Actions.removeProduct,
      toggleStarredProduct: Actions.toggleStarredProduct,
      toggleStarredProducts: Actions.toggleStarredProducts,
      setProductsStarred: Actions.setProductsStarred,
      setProductsUnstarred: Actions.setProductsUnstarred
    },
    dispatch
  );
}

function mapStateToProps({ productsApp }) {
  return {
    products: productsApp.products.entities,
    selectedProductIds: productsApp.products.selectedProductIds,
    searchText: productsApp.products.searchText,
    user: productsApp.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductsList)
);
