import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import WarrantyRegistrationsList from './WarrantyRegistrationList';
import WarrantyRegistrationsHeader from './WarrantyRegistrationHeader';
import WarrantyRegistrationDialog from './WarrantyRegistrationDialog';
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

class WarrantyRegistrationApp extends Component {
    componentDidMount() {
        this.props.getWarrantyRegistration(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getWarrantyRegistration(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewWarrantyRegistrationDialog} = this.props;
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
                    header={<WarrantyRegistrationsHeader pageLayout={() => this.pageLayout}/>}
                    content={<WarrantyRegistrationsList/>}
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
                        onClick={openNewWarrantyRegistrationDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <WarrantyRegistrationDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWarrantyRegistration: Actions.getWarrantyRegistration,
            openNewWarrantyRegistrationDialog: Actions.openNewWarrantyRegistrationDialog
        },
        dispatch
    );
}

function mapStateToProps({warrantyRegistrationApp}) {
    return {
        // warrantyRegistrations: warrantyRegistrationApp.warrantyRegistration.entities,
        selectedWarrantyRegistrationIds: warrantyRegistrationApp.warrantyRegistration.selectedWarrantyRegistrationIds,
        searchText: warrantyRegistrationApp.warrantyRegistration.searchText,
        user: warrantyRegistrationApp.user
    };
}

export default withReducer('warrantyRegistrationApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(WarrantyRegistrationApp)
        )
    )
);
