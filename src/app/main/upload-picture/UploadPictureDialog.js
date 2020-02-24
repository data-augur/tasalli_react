import React, {Component} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    Toolbar,
    Typography
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newUploadPictureState = {
    images: ''
};

class UploadPictureDialog extends Component {
    state = {...newUploadPictureState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.uploadPictureDialog.props.open &&
            this.props.uploadPictureDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.uploadPictureDialog.type === 'edit' &&
                this.props.uploadPictureDialog.data &&
                !_.isEqual(this.props.uploadPictureDialog.data, prevState)
            ) {
                this.setState({...this.props.uploadPictureDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.uploadPictureDialog.type === 'new' &&
                !_.isEqual(newUploadPictureState, prevState)
            ) {
                this.setState({...newUploadPictureState});
            }
        }
    }

    handleChange = event => {
        this.setState(
            _.set(
                {...this.state},
                event.target.name,
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            )
        );
    };

    handleFile(e){
        let file=e.target.files[0]
        this.setState({images: file})
    }

    closeComposeDialog = () => {
        this.props.closeNewUploadPictureDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        let {
            uploadPictureDialog,
            addUploadPicture,
        } = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...uploadPictureDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {uploadPictureDialog.type === 'new' ? 'Upload Picture' : 'Edit UploadPicture'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="uploadPicture avatar"
              src={this.state.avatar}
            /> */}
                        {uploadPictureDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">

                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">image</Icon>
                        </div>
                        <input title="Image" type="file" name="images" onChange={(e)=>this.handleFile(e)}
                        />
                    </div>
                </DialogContent>

                {uploadPictureDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addUploadPicture(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={
                                this.state.images===''
                            }
                        >
                            Upload
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">

                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            closeNewUploadPictureDialog: Actions.closeNewUploadPictureDialog,
            addUploadPicture: Actions.addUploadPicture
        },
        dispatch
    );
}

function mapStateToProps({uploadPicturesApp}) {
    return {
        uploadPictureDialog: uploadPicturesApp.uploadPictures.uploadPictureDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPictureDialog);
