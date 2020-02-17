import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import QrCodesList from './QrCodesList';
import QrCodesHeader from './QrCodesHeader';
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

class QrCodesApp extends Component {
    componentDidMount() {
        this.props.getQrCodes(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getQrCodes(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewQrCodeDialog} = this.props;
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
                    header={<QrCodesHeader pageLayout={() => this.pageLayout}/>}
                    content={<QrCodesList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />

            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getQrCodes: Actions.getQrCodes,
            openNewQrCodeDialog: Actions.openNewQrCodeDialog
        },
        dispatch
    );
}

function mapStateToProps({qrcodesApp}) {
    return {
        selectedQrCodeIds: qrcodesApp.qrcodes.selectedQrCodeIds,
        searchText: qrcodesApp.qrcodes.searchText,
        user: qrcodesApp.user
    };
}

export default withReducer('qrcodesApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(QrCodesApp)
        )
    )
);
