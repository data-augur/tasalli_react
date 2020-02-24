import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import UploadPicturesList from './UploadPictureList';
import UploadPicturesHeader from './UploadPictureHeader';
import UploadPictureDialog from './UploadPictureDialog';
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

class UploadPicturesApp extends Component {
    componentDidMount() {
        this.props.openNewUploadPictureDialog(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.openNewUploadPictureDialog(this.props.match.params);
        }
    }

    render() {
        const {classes, isProcess, openNewUploadPictureDialog} = this.props;
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
                    header={<UploadPicturesHeader pageLayout={() => this.pageLayout}/>}
                    content={<UploadPicturesList/>}
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
                        onClick={openNewUploadPictureDialog}
                        disabled={isProcess}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <UploadPictureDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            openNewUploadPictureDialog: Actions.openNewUploadPictureDialog
        },
        dispatch
    );
}

function mapStateToProps({uploadPicturesApp}) {
    return {
        // uploadPictures: uploadPicturesApp.uploadPictures.entities,
        selectedUploadPictureIds: uploadPicturesApp.uploadPictures.selectedUploadPictureIds,
        isProcess: uploadPicturesApp.uploadPictures.isProcess,
        user: uploadPicturesApp.user
    };
}

export default withReducer('uploadPicturesApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(UploadPicturesApp)
        )
    )
);
