import React, {Component} from 'react';
import { withStyles} from '@material-ui/core';
import { FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import QrcodesList from './QrCodesList';
import QrcodesHeader from './QrCodesHeader';
import QrcodeDialog from './QrCodesDialog';
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

class QrcodesApp extends Component {
    componentDidMount() {
        this.props.getQrcodes(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getQrcodes(this.props.match.params);
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
                    header={<QrcodesHeader pageLayout={() => this.pageLayout}/>}
                    content={<QrcodesList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <QrcodeDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getQrcodes: Actions.getQrcodes,
            openNewQrcodeDialog: Actions.openNewQrcodeDialog
        },
        dispatch
    );
}

function mapStateToProps({qrcodesApp}) {
    return {
        selectedQrcodeIds: qrcodesApp.qrcodes.selectedQrcodeIds,
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
            )(QrcodesApp)
        )
    )
);
