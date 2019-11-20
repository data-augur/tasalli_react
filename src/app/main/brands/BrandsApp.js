import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import BrandsList from './BrandsList';
import BrandsHeader from './BrandsHeader';
import BrandDialog from './BrandsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';
const styles = theme => ({
  addButton: {
    position: 'fixed',
    right: 12,
    bottom: 12,
    zIndex: 99
  }
});

class BrandsApp extends Component {
  componentDidMount() {
    this.props.getBrands(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getBrands(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewBrandDialog } = this.props;
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
          header={<BrandsHeader pageLayout={() => this.pageLayout} />}
          content={<BrandsList />}
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
            onClick={openNewBrandDialog}
          >
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
        <BrandDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBrands: Actions.getBrands,
      openNewBrandDialog: Actions.openNewBrandDialog
    },
    dispatch
  );
}

function mapStateToProps({ brandsApp }) {
  return {
    selectedBrandIds: brandsApp.brands.selectedBrandIds,
    searchText: brandsApp.brands.searchText,
    user: brandsApp.user
  };
}

export default withReducer('brandsApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(BrandsApp)
    )
  )
);
