import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import CompanysList from './CompaniesList';
import CompanysHeader from './CompaniesHeader';
import CompanyDialog from './CompaniesDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';
// import { StickyContainer, Sticky } from 'react-sticky';
const styles = theme => ({
  addButton: {
    position: 'fixed',
    right: 12,
    bottom: 12,
    zIndex: 99
  }
});

class CompaniesApp extends Component {
  componentDidMount() {
    this.props.getCompanys(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getCompanys(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewCompanyDialog } = this.props;
      if(!localStorage.getItem('jwtToken'))
      {
          window.location = '/login';
      }
    return (
      <React.Fragment>
        <FusePageSimple
          classes={{
            contentCardWrapper: 'p-16 sm:p-24 pb-80',
            leftSidebar: 'w-256 border-0',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
          }}
          header={<CompanysHeader pageLayout={() => this.pageLayout} />}
          content={<CompanysList />}
          sidebarInner
          onRef={instance => {
            this.pageLayout = instance;
          }}
          innerScroll
        />
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={openNewCompanyDialog}
          >
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
        <CompanyDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCompanys: Actions.getCompanies,
      openNewCompanyDialog: Actions.openNewCompanyDialog
    },
    dispatch
  );
}

function mapStateToProps({ companiesApp }) {
  return {
    // companys: companiesApp.companies.entities,
    selectedCompanyIds: companiesApp.companies.selectedCompanyIds,
    searchText: companiesApp.companies.searchText,
    user: companiesApp.user
  };
}

export default withReducer('companiesApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(CompaniesApp)
    )
  )
);
