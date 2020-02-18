import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import POPUPSList from './PopupsList';
import POPUPSHeader from './PopupsHeader';
import PopupDialog from './PopupsDialog';
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

class POPUPSApp extends Component {
    componentDidMount() {
        this.props.getPOPUPS(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getPOPUPS(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewPopupDialog} = this.props;
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
                    header={<POPUPSHeader pageLayout={() => this.pageLayout}/>}
                    content={<POPUPSList/>}
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
                        onClick={openNewPopupDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <PopupDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getPOPUPS: Actions.getPOPUPS,
            openNewPopupDialog: Actions.openNewPopupDialog
        },
        dispatch
    );
}

function mapStateToProps({popUpsApp}) {
    return {
        // popups: popupsApp.popups.entities,
        selectedPopupIds: popUpsApp.popUps.selectedPopupIds,
        searchText: popUpsApp.popUps.searchText,
        user: popUpsApp.user
    };
}

export default withReducer('popUpsApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(POPUPSApp)
        )
    )
);
