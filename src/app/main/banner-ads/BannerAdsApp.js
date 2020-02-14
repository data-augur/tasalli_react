import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import BannerAdsList from './BannerAdsList';
import BannerAdsHeader from './BannerAdsHeader';
import BannerAdDialog from './BannerAdsDialog';
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

class BannerAdsApp extends Component {
    componentDidMount() {
        this.props.getBannerAds(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getBannerAds(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewBannerAdDialog} = this.props;
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
                    header={<BannerAdsHeader pageLayout={() => this.pageLayout}/>}
                    content={<BannerAdsList/>}
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
                        onClick={openNewBannerAdDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <BannerAdDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getBannerAds: Actions.getBannerAds,
            openNewBannerAdDialog: Actions.openNewBannerAdDialog
        },
        dispatch
    );
}

function mapStateToProps({bannerAdsApp}) {
    return {
        // ads: adsApp.ads.entities,
        selectedBannerAdIds: bannerAdsApp.ads.selectedAdIds,
        searchText: bannerAdsApp.ads.searchText,
        user: bannerAdsApp.user
    };
}

export default withReducer('bannerAdsApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(BannerAdsApp)
        )
    )
);
