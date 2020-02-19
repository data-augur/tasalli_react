import React, {Component} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newQrcodeState = {
    latitude: '',
    longitude: '',
    code_type: '',
    data_type: '',
    data: '',
    scan_time: '',
    phoneNumber: '',
    id: ''
};

class QrcodeDialog extends Component {
    state = {...newQrcodeState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.qrcodeDialog.props.open &&
            this.props.qrcodeDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.qrcodeDialog.type === 'edit' &&
                this.props.qrcodeDialog.data &&
                !_.isEqual(this.props.qrcodeDialog.data, prevState)
            ) {
                this.setState({...this.props.qrcodeDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.qrcodeDialog.type === 'new' &&
                !_.isEqual(newQrcodeState, prevState)
            ) {
                this.setState({...newQrcodeState});
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
        this.props.qrcodeDialog.type === 'edit'
            ? this.props.closeEditQrcodeDialog()
            : this.props.closeNewQrcodeDialog();
    };



    render() {
        const {qrcodeDialog} = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...qrcodeDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="md"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {qrcodeDialog.type === 'new' ? '' : 'Qrcode Details'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">

                        {qrcodeDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Area</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="latitude"
                            autoFocus
                            id="latitude"
                            name="latitude"
                            value={this.state.latitude}
                            onChange={this.handleChange}
                            disabled={true}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Area</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="longitude"
                            autoFocus
                            id="longitude"
                            name="longitude"
                            disabled={true}
                            value={this.state.longitude}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Type</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Code Type"
                            autoFocus
                            id="code_type"
                            name="code_type"
                            value={this.state.code_type}
                            onChange={this.handleChange}
                            disabled={true}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Type</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Data Type"
                            autoFocus
                            id="data_type"
                            name="data_type"
                            value={this.state.data_type}
                            onChange={this.handleChange}
                            disabled={true}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Time</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Scan Time"
                            autoFocus
                            id="scan_time"
                            name="scan_time"
                            value={this.state.scan_time}
                            onChange={this.handleChange}
                            disabled={true}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Data</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Data"
                            autoFocus
                            id="data"
                            name="data"
                            multiline
                            value={this.state.data}
                            onChange={this.handleChange}
                            disabled={true}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {qrcodeDialog.type === 'new' ? (
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
            closeEditQrcodeDialog: Actions.closeEditQrcodeDialog,
            closeNewQrcodeDialog: Actions.closeNewQrcodeDialog,
            addQrcode: Actions.addQrcode,
            updateQrcode: Actions.updateQrcode,
            removeQrcode: Actions.removeQrcode
        },
        dispatch
    );
}

function mapStateToProps({qrcodesApp}) {
    return {
        qrcodeDialog: qrcodesApp.qrcodes.qrcodeDialog,
        companies: qrcodesApp.qrcodes.companies
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QrcodeDialog);
