import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import SurveysList from './SurveysList';
import SurveysHeader from './SurveysHeader';
import SurveyDialog from './SurveysDialog';
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
        this.props.getSurveys(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getSurveys(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewSurveyDialog} = this.props;
        if (!localStorage.getItem('jwtToken')) {
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
                    header={<SurveysHeader pageLayout={() => this.pageLayout}/>}
                    content={<SurveysList/>}
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
                        onClick={openNewSurveyDialog}
                    >
                        <Icon>add</Icon>
                        {/*new*/}
                    </Fab>
                </FuseAnimate>
                <SurveyDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getSurveys: Actions.getSurveys,
            openNewSurveyDialog: Actions.openNewSurveyDialog
        },
        dispatch
    );
}

function mapStateToProps({surveysApp}) {
    return {
        // surveys: brandsApp.brands.entities,
        selectedSurveyIds: surveysApp.surveys.selectedSurveyIds,
        searchText: surveysApp.surveys.searchText,
        user: surveysApp.user
    };
}

export default withReducer('surveysApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(SurveysApp)
        )
    )
);
