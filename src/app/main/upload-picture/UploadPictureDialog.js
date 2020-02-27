import {Component} from 'react';
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

        return null;
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
