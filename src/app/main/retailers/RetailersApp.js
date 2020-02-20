import React, {Component} from 'react';
import { withStyles} from '@material-ui/core';
import { FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import RetailersList from './RetailersList';
import RetailersHeader from './RetailersHeader';
import RetailerDialog from './RetailersDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';

const styles = theme => ({
    addButton: {
        position: 'fixed',
        right: 12,
        bottom: 52,
        zIndex: 99
    }
});

class RetailersApp extends Component {
    componentDidMount() {
        this.props.getRetailers(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getRetailers(this.props.match.params);
        }
    }

    render() {
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
                    header={<RetailersHeader pageLayout={() => this.pageLayout}/>}
                    content={<RetailersList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                {/*<FuseAnimate animation="transition.expandIn" delay={300}>*/}
                    {/*<Fab*/}
                    {/*    color="primary"*/}
                    {/*    aria-label="add"*/}
                    {/*    className={classes.addButton}*/}
                    {/*    onClick={openNewRetailerDialog}*/}
                    {/*>*/}
                    {/*    <Icon>add</Icon>*/}
                    {/*</Fab>*/}
                {/*</FuseAnimate>*/}
                <RetailerDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getRetailers: Actions.getRetailers,
            openNewRetailerDialog: Actions.openNewRetailerDialog
        },
        dispatch
    );
}

function mapStateToProps({retailersApp}) {
    return {
        selectedRetailerIds: retailersApp.retailers.selectedRetailerIds,
        searchText: retailersApp.retailers.searchText,
        user: retailersApp.user
    };
}

export default withReducer('retailersApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(RetailersApp)
        )
    )
);
