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

const newRetailerState = {
    name: '',
    companyId: ''
    // id: ''
};

class RetailerDialog extends Component {
    state = {...newRetailerState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.retailerDialog.props.open &&
            this.props.retailerDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.retailerDialog.type === 'edit' &&
                this.props.retailerDialog.data &&
                !_.isEqual(this.props.retailerDialog.data, prevState)
            ) {
                this.setState({...this.props.retailerDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.retailerDialog.type === 'new' &&
                !_.isEqual(newRetailerState, prevState)
            ) {
                this.setState({...newRetailerState});
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
        this.props.retailerDialog.type === 'edit'
            ? this.props.closeEditRetailerDialog()
            : this.props.closeNewRetailerDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {retailerDialog, addRetailer, updateRetailer, removeRetailer} = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...retailerDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {retailerDialog.type === 'new' ? 'New Retailer' : 'Edit Retailer'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">

                        {retailerDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
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
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>

                    </div>
                </DialogContent>

                {retailerDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addRetailer(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateRetailer(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            hidden={localStorage.getItem('Role') !== 'superAdmin'}
                            disabled={localStorage.getItem('Role') !== 'superAdmin'}
                            onClick={() => {
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' retailer?')) {
                                    removeRetailer(this.state.id);
                                    this.closeComposeDialog();
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            closeEditRetailerDialog: Actions.closeEditRetailerDialog,
            closeNewRetailerDialog: Actions.closeNewRetailerDialog,
            addRetailer: Actions.addRetailer,
            updateRetailer: Actions.updateRetailer,
            removeRetailer: Actions.removeRetailer
        },
        dispatch
    );
}

function mapStateToProps({retailersApp}) {
    return {
        retailerDialog: retailersApp.retailers.retailerDialog,
        companies: retailersApp.retailers.companies
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RetailerDialog);
