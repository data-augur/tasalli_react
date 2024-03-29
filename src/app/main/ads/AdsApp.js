import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import AdsList from './AdsList';
import AdsHeader from './AdsHeader';
import AdDialog from './AdsDialog';
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

class AdsApp extends Component {
    componentDidMount() {
        this.props.getAds(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getAds(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewAdDialog} = this.props;
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
                    header={<AdsHeader pageLayout={() => this.pageLayout}/>}
                    content={<AdsList/>}
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
                        onClick={openNewAdDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <AdDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAds: Actions.getAds,
            openNewAdDialog: Actions.openNewAdDialog
        },
        dispatch
    );
}

function mapStateToProps({adsApp}) {
    return {
        // ads: adsApp.ads.entities,
        selectedAdIds: adsApp.ads.selectedAdIds,
        searchText: adsApp.ads.searchText,
        user: adsApp.user
    };
}

export default withReducer('adsApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(AdsApp)
        )
    )
);
