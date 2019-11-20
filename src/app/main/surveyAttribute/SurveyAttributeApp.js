import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import SurveyAttributesList from './SurveyAttributeList';
import SurveyAttributesHeader from './SurveyAttributeHeader';
import SurveyAttributeDialog from './SurveyAttributeDialog';
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

class SurveysApp extends Component {
  componentDidMount() {
    this.props.getSurveyAttribute(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getSurveyAttribute(this.props.match.params);
    }
  }

  render() {
    const { classes, openNewSurveyAttributeDialog } = this.props;
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
          header={<SurveyAttributesHeader pageLayout={() => this.pageLayout} />}
          content={<SurveyAttributesList />}
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
            onClick={openNewSurveyAttributeDialog}
          >
            <Icon>add</Icon>
              {/*new*/}
          </Fab>
        </FuseAnimate>
        <SurveyAttributeDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSurveyAttribute: Actions.getSurveyAttribute,
      openNewSurveyAttributeDialog: Actions.openNewSurveyAttributeDialog
    },
    dispatch
  );
}

function mapStateToProps({ surveyAttributeApp }) {
  return {
    // surveyAttributes: brandsApp.brands.entities,
    selectedSurveyAttributeIds: surveyAttributeApp.surveyAttribute.selectedSurveyAttributeIds,
    searchText: surveyAttributeApp.surveyAttribute.searchText,
    user: surveyAttributeApp.user
  };
}

export default withReducer('surveyAttributeApp', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(SurveysApp)
    )
  )
);
