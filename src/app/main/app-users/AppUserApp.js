import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import ContactsList from './AppUsersList';
import ContactsHeader from './AppUserHeader';
import ContactDialog from './AppUserDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';
const styles = theme => ({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99
  }
});

class BrandUserApp extends Component {
  componentDidMount() {
    this.props.getAllAppUsers(this.props.match.params);
    this.props.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getAllAppUsers(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewContactDialog } = this.props;

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
        {/* <FuseAnimate animation="transition.expandIn" delay={300}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={openNewContactDialog}
          >
            <Icon>person_add</Icon>
          </Fab>
        </FuseAnimate> */}
        <ContactDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllAppUsers: Actions.getAllAppUsers,
      getUserData: Actions.getUserData,
      openNewContactDialog: Actions.openNewContactDialog
    },
    dispatch
  );
}

function mapStateToProps({ appUserApp }) {
  return {
    contacts: appUserApp.appUser.entities,
    selectedContactIds: appUserApp.appUser.selectedContactIds,
    searchText: appUserApp.appUser.searchText,
    user: appUserApp.user
  };
}

export default withReducer('appUserApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(BrandUserApp)
    )
  )
);
