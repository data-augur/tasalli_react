import React, {Component} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import qrcodes from "./store/reducers/qrCodes.reducer";

const newQrCodeState = {
    latitude: '',
    longitude: '',
    code_type: '',
    data_type: '',
    data: '',
    scan_time: '',
    phoneNumber: '',
    id: ''
};

class QrCodeDialog extends Component {
    state = {...newQrCodeState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.qrCodeDialog.props.open &&
            this.props.qrCodeDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.qrCodeDialog.type === 'edit' &&
                this.props.qrCodeDialog.data &&
                !_.isEqual(this.props.qrCodeDialog.data, prevState)
            ) {
                this.setState({...this.props.qrCodeDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.qrCodeDialog.type === 'new' &&
                !_.isEqual(newQrCodeState, prevState)
            ) {
                this.setState({...newQrCodeState});
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

    closeComposeDialog = () => {
        this.props.qrCodeDialog.type === 'edit'
            ? this.props.closeEditQrCodeDialog()
            : this.props.closeNewQrCodeDialog();
    };

    render() {
        const {qrCodeDialog} = this.props;
        console.log('l0l8jy6h6')

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...qrCodeDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {qrCodeDialog.type === 'new' ? 'New QrCode' : 'QrCode Details'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">

                        {qrCodeDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.phoneNumber}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="latitude"
                            autoFocus
                            id="latitude"
                            name="latitude"
                            value={this.state.latitude}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="longitude"
                            autoFocus
                            id="longitude"
                            name="longitude"
                            value={this.state.longitude}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Code Type"
                            autoFocus
                            id="code_type"
                            name="code_type"
                            value={this.state.code_type}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Data Type"
                            autoFocus
                            id="data_type"
                            name="data_type"
                            value={this.state.data_type}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Scan Time"
                            autoFocus
                            id="scan_time"
                            name="scan_time"
                            value={this.state.scan_time}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Data"
                            autoFocus
                            id="data"
                            name="data"
                            value={this.state.data}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {qrCodeDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">

                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Exit
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            closeEditQrCodeDialog: Actions.closeEditQrCodeDialog,
            closeNewQrCodeDialog: Actions.closeNewQrCodeDialog
        },
        dispatch
    );
}

function mapStateToProps({qrCodesApp}) {
    console.log('kjhgfghj')
    return {
        qrCodeDialog: qrCodesApp.qrcodes.qrCodeDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QrCodeDialog);
