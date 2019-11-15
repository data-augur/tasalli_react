import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import ContactsList from './WarrantyClaimedList';
import ContactsHeader from './WarrantyClaimedHeader';
import ContactDialog from './WarrantyClaimedDialog';
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

class WarrantyClaimedApp extends Component {
  componentDidMount() {
    this.props.getWarrantyClaimed(this.props.match.params);
    this.props.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getWarrantyRegister(this.props.match.params);
    }
  }

  render() {
    const {  } = this.props;
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
        {/*<FuseAnimate animation="transition.expandIn" delay={300}>*/}
        {/*  <Fab*/}
        {/*    color="primary"*/}
        {/*    aria-label="add"*/}
        {/*    className={classes.addButton}*/}
        {/*    onClick={openNewContactDialog}*/}
        {/*  >*/}
        {/*    <Icon>add</Icon>*/}
        {/*  </Fab>*/}
        {/*</FuseAnimate>*/}
        <ContactDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getWarrantyClaimed: Actions.getWarrantyClaimed,
      getUserData: Actions.getUserData,
      openNewContactDialog: Actions.openNewContactDialog
    },
    dispatch
  );
}

function mapStateToProps({ warrantyClaimedApp }) {
  return {
    // contacts: warrantyRegistrationApp.warrantyRegistration.entities,
    selectedContactIds: warrantyClaimedApp.warrantyClaimed.selectedContactIds,
    searchText: warrantyClaimedApp.warrantyClaimed.searchText,
    user: warrantyClaimedApp.user
  };
}

export default withReducer('warrantyClaimedApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(WarrantyClaimedApp)
    )
  )
);
