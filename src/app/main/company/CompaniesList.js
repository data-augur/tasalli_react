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

class CompanysList extends Component {
  state = {
    selectedCompanysMenu: null
  };

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  openSelectedCompanyMenu = event => {
    this.setState({ selectedCompanysMenu: event.currentTarget });
  };

  closeSelectedCompanysMenu = () => {
    this.setState({ selectedCompanysMenu: null });
  };

  render() {
    const {
      companys,
      searchText,
      selectedCompanyIds,
    
      openEditCompanyDialog,
      removeCompanys,
      removeCompany,
      setCompanysUnstarred,
      setCompanysStarred
    } = this.props;
    const data = this.getFilteredArray(companys, searchText);
    const { selectedCompanysMenu } = this.state;

    if (!data && data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no company!
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
                  openEditCompanyDialog(rowInfo.original);
                }
              }
            };
          }}
          data={data}
          columns={[
            
            {
              Header: () =>
                selectedCompanyIds.length > 0 && (
                  <React.Fragment>
                    <IconButton
                      aria-owns={
                        selectedCompanysMenu ? 'selectedCompanysMenu' : null
                      }
                      aria-haspopup="true"
                      onClick={this.openSelectedCompanyMenu}
                    >
                      <Icon>more_horiz</Icon>
                    </IconButton>
                    <Menu
                      id="selectedCompanysMenu"
                      anchorEl={selectedCompanysMenu}
                      open={Boolean(selectedCompanysMenu)}
                      onClose={this.closeSelectedCompanysMenu}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            removeCompanys(selectedCompanyIds);
                            this.closeSelectedCompanysMenu();
                          }}
                        >
                          <ListItemIcon>
                            <Icon>delete</Icon>
                          </ListItemIcon>
                          <ListItemText inset primary="Remove" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setCompanysStarred(selectedCompanyIds);
                            this.closeSelectedCompanysMenu();
                          }}
                        >
                          <ListItemIcon>
                            <Icon>star</Icon>
                          </ListItemIcon>
                          <ListItemText inset primary="Starred" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setCompanysUnstarred(selectedCompanyIds);
                            this.closeSelectedCompanysMenu();
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
              Header: 'Name',
              accessor: 'name',
              filterable: true,
              className: 'font-bold'
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
                      ev.stopPropagation();
                      removeCompany(row.original.id);
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
          noDataText="No company found"
        />
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCompanys: Actions.getCompanies,
      toggleInSelectedCompanys: Actions.toggleInSelectedCompanys,
      selectAllCompanys: Actions.selectAllCompanys,
      deSelectAllCompanys: Actions.deSelectAllCompanys,
      openEditCompanyDialog: Actions.openEditCompanyDialog,
      removeCompanys: Actions.removeCompanys,
      removeCompany: Actions.removeCompany,
      toggleStarredCompany: Actions.toggleStarredCompany,
      toggleStarredCompanys: Actions.toggleStarredCompanys,
      setCompanysStarred: Actions.setCompanysStarred,
      setCompanysUnstarred: Actions.setCompanysUnstarred
    },
    dispatch
  );
}

function mapStateToProps({ companiesApp }) {
  return {
    companys: companiesApp.companies.entities,
    selectedCompanyIds: companiesApp.companies.selectedCompanyIds,
    searchText: companiesApp.companies.searchText,
    user: companiesApp.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanysList)
);
