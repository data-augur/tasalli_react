import React, { Component } from "react";
import {
  Button,
  Icon,
  MuiThemeProvider,
  Paper,
  Typography,
} from "@material-ui/core";
import { FuseAnimate, FuseUtils } from "@fuse";
import CsvDownloader from "react-csv-downloader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import _ from "@lodash";

class BrandUsersHeader extends Component {
  state = {
    brandId: "",
    companyId: "",
    jobTitle: "",
  };
  getBrandUsersArray = (entities, searchText) => {
    const arr = Object.keys(entities).map((id) => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const { brandUsers, searchText, searchBrandUsers, mainTheme } = this.props;
    const brandUsersArray = this.getBrandUsersArray(brandUsers, searchText);

    const columns = [
      {
        id: "id",
        displayName: "ID",
      },
      {
        id: "name",
        displayName: "Name",
      },
      {
        id: "email",
        displayName: "Email",
      },
      {
        id: "gender",
        displayName: "Gender",
      },
      {
        id: "role",
        displayName: "Role",
      },
      {
        id: "phoneNumber",
        displayName: "Phone Number",
      },
      {
        id: "brand_Name",
        displayName: "Brand Name",
      },
      {
        id: "company_Name",
        displayName: "Company Name",
      },
      {
        id: "address",
        displayName: "Address",
      },
    ];

    return (
      <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
        <div className="flex flex-shrink items-center sm:w-224">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="h6" className="hidden sm:flex">
                Client Users
              </Typography>
            </FuseAnimate>
          </div>
        </div>

        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
          <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
            <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
              <label>Select Brand</label>
              <MuiThemeProvider theme={mainTheme}>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Paper
                    className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                    elevation={1}
                  >
                    <select
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                      value={this.state.brandId}
                      id="brandId"
                      name="brandId"
                    >
                      <option value="">All</option>
                      {this.props.brands.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </Paper>
                </FuseAnimate>
              </MuiThemeProvider>
            </div>
            <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
              <label>Select Company</label>
              <MuiThemeProvider theme={mainTheme}>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Paper
                    className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                    elevation={1}
                  >
                    <select
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                      value={this.state.companyId}
                      id="companyId"
                      name="companyId"
                    >
                      <option value="">All</option>
                      {this.props.companies.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </Paper>
                </FuseAnimate>
              </MuiThemeProvider>
            </div>
            <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
              <label>Select JobTitle</label>
              <MuiThemeProvider theme={mainTheme}>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Paper
                    className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                    elevation={1}
                  >
                    <select
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                      value={this.state.jobTitle}
                      id="jobTitle"
                      name="jobTitle"
                    >
                      <option value="">All</option>
                      <option value="companyAdmin">Company Admin</option>
                      <option value="brandAdmin">Brand Admin</option>
                    </select>
                  </Paper>
                </FuseAnimate>
              </MuiThemeProvider>
            </div>
          </div>
          <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
            <Button
              style={{ marginTop: 5 }}
              variant="contained"
              color="secondary"
              onClick={() => {
                searchBrandUsers(this.state);
              }}
            >
              Apply
            </Button>
          </div>
        </div>

        {brandUsersArray && brandUsersArray.length > 0 ? (
          <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
            <MuiThemeProvider theme={mainTheme}>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <CsvDownloader
                  columns={columns}
                  datas={brandUsersArray}
                  filename="brandUsers"
                >
                  <Button variant="contained" color="secondary">
                    Export to CSV
                  </Button>
                </CsvDownloader>
              </FuseAnimate>
            </MuiThemeProvider>
          </div>
        ) : null}
      </div>
    );
  }
  handleChange = (event) => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
    );
  };
}

function mapDispatchToProps(dispatch) {
  Actions.reset();
  return bindActionCreators(
    {
      setSearchText: Actions.setSearchText,
      searchBrandUsers: Actions.searchBrandUsers,
    },
    dispatch
  );
}

function mapStateToProps({ brandUserApp, fuse }) {
  return {
    brandUsers: brandUserApp.brandUser.entities,
    searchText: brandUserApp.brandUser.searchText,
    companies: brandUserApp.brandUser.companies,
    brands: brandUserApp.brandUser.brands,
    mainTheme: fuse.settings.mainTheme,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandUsersHeader);
