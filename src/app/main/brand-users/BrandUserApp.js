import React, { Component } from "react";
import { Fab, Icon, withStyles } from "@material-ui/core";
import { FuseAnimate, FusePageSimple } from "@fuse";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withReducer from "app/store/withReducer";
import _ from "@lodash";
import BrandUsersList from "./BrandUsersList";
import BrandUsersHeader from "./BrandUserHeader";
import BrandUserDialog from "./BrandUserDialog";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import "./style.css";

const styles = (theme) => ({
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

class BrandUserApp extends Component {
  componentDidMount() {
    this.props.getBrandUsers(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getBrandUsers(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewBrandUserDialog } = this.props;
    if (!localStorage.getItem("jwtToken")) {
      window.location = "/login";
    }
    return (
      <React.Fragment>
        <FusePageSimple
          classes={{
            contentCardWrapper: "p-16 sm:p-24 pb-80",
            leftSidebar: "w-256 border-0",
            header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
          }}
          header={<BrandUsersHeader pageLayout={() => this.pageLayout} />}
          content={<BrandUsersList />}
          sidebarInner
          onRef={(instance) => {
            this.pageLayout = instance;
          }}
          innerScroll
        />
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={openNewBrandUserDialog}
          >
            <Icon>person_add</Icon>
          </Fab>
        </FuseAnimate>
        <BrandUserDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBrandUsers: Actions.getBrandUsers,
      openNewBrandUserDialog: Actions.openNewBrandUserDialog,
    },
    dispatch
  );
}

function mapStateToProps({ brandUserApp }) {
  return {
    brandUsers: brandUserApp.brandUser.entities,
    selectedBrandUserIds: brandUserApp.brandUser.selectedBrandUserIds,
    searchText: brandUserApp.brandUser.searchText,
    user: brandUserApp.user,
  };
}

export default withReducer(
  "brandUserApp",
  reducer
)(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandUserApp))
  )
);
