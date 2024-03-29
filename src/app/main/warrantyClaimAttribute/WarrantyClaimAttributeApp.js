import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import WarrantyClaimAttributesList from './WarrantyClaimAttributeList';
import WarrantyClaimAttributesHeader from './WarrantyClaimAttributeHeader';
import WarrantyClaimAttributeDialog from './WarrantyClaimAttributeDialog';
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

class WarrantyClaimAttributeApp extends Component {
    componentDidMount() {
        this.props.getWarrantyClaimAttribute(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getWarrantyClaimAttribute(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewWarrantyClaimAttributeDialog} = this.props;
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
                    header={<WarrantyClaimAttributesHeader pageLayout={() => this.pageLayout}/>}
                    content={<WarrantyClaimAttributesList/>}
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
                        onClick={openNewWarrantyClaimAttributeDialog}
                    >
                        <Icon>add</Icon>
                        {/*new*/}
                    </Fab>
                </FuseAnimate>
                <WarrantyClaimAttributeDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWarrantyClaimAttribute: Actions.getWarrantyClaimAttribute,
            openNewWarrantyClaimAttributeDialog: Actions.openNewWarrantyClaimAttributeDialog
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimAttributeApp}) {
    return {
        // warrantyClaimAttributes: brandsApp.brands.entities,
        selectedWarrantyClaimAttributeIds: warrantyClaimAttributeApp.warrantyClaimAttribute.selectedWarrantyClaimAttributeIds,
        searchText: warrantyClaimAttributeApp.warrantyClaimAttribute.searchText,
        user: warrantyClaimAttributeApp.user
    };
}

export default withReducer('warrantyClaimAttributeApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(WarrantyClaimAttributeApp)
        )
    )
);
