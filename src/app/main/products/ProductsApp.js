import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import ContactsList from './ProductsList';
import ContactsHeader from './ProductsHeader';
import ContactDialog from './ProductsDialog';
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

class ProductsApp extends Component {
  componentDidMount() {
    this.props.getProducts(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getProducts(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewContactDialog } = this.props;
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
          header={<ContactsHeader pageLayout={() => this.pageLayout} />}
          content={<ContactsList />}
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
            onClick={openNewContactDialog}
          >
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
        <ContactDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProducts: Actions.getProducts,
      openNewContactDialog: Actions.openNewContactDialog
    },
    dispatch
  );
}

function mapStateToProps({ productsApp }) {
  return {
    // contacts: brandsApp.brands.entities,
    selectedContactIds: productsApp.products.selectedContactIds,
    searchText: productsApp.products.searchText,
    user: productsApp.user
  };
}

export default withReducer('productsApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProductsApp)
    )
  )
);
