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

const newWarrantyClaimedState = {
    code: '',
    date: '',
    phoneNumber: '',
    id: '',
    details: []
};

class WarrantyClaimedDialog extends Component {
    state = {...newWarrantyClaimedState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        // this.state.detail=this.state.details;

        if (
            !prevProps.warrantyClaimedDialog.props.open &&
            this.props.warrantyClaimedDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.warrantyClaimedDialog.type === 'edit' &&
                this.props.warrantyClaimedDialog.data &&
                !_.isEqual(this.props.warrantyClaimedDialog.data, prevState)
            ) {
                this.setState({...this.props.warrantyClaimedDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.warrantyClaimedDialog.type === 'new' &&
                !_.isEqual(newWarrantyClaimedState, prevState)
            ) {
                this.setState({...newWarrantyClaimedState});
            }
        }
    }


    closeComposeDialog = () => {
        this.props.warrantyClaimedDialog.type === 'edit'
            ? this.props.closeEditWarrantyClaimedDialog()
            : this.props.closeNewWarrantyClaimedDialog();
    };

    render() {
        const {warrantyClaimedDialog, removeWarrantyRegister} = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...warrantyClaimedDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {warrantyClaimedDialog.type === 'new' ? 'New Warranty Registration' : 'Warranty Claimed Detail'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="warrantyClaimed avatar"
              src={this.state.avatar}
            /> */}
                        {warrantyClaimedDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">loyalty</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="SKU"
                            autoFocus
                            id="sku_code"
                            name="sku_code"
                            disabled={true}
                            value={this.state.sku_code}
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
                            label="Product Code"
                            autoFocus
                            id="code"
                            name="code"
                            disabled={true}
                            value={this.state.code}
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
                            label="Name"
                            autoFocus
                            id="userName"
                            name="userName"
                            disabled={true}
                            value={this.state.userName}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">business</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Address"
                            autoFocus
                            id="address"
                            name="address"
                            disabled={true}
                            value={this.state.address}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">business</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="User City"
                            autoFocus
                            id="city"
                            name="city"
                            disabled={true}
                            value={this.state.city}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">email</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="User Email"
                            autoFocus
                            id="email"
                            name="email"
                            disabled={true}
                            value={this.state.email}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">business</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="User Office Address"
                            autoFocus
                            id="officeAddress"
                            name="officeAddress"
                            disabled={true}
                            value={this.state.officeAddress}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">group</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Age Group"
                            autoFocus
                            id="ageGroup"
                            name="ageGroup"
                            disabled={true}
                            value={this.state.ageGroup}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">credit_card</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="User CNIC"
                            autoFocus
                            id="cnic"
                            name="cnic"
                            disabled={true}
                            value={this.state.cnic}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">phone</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Phone Number"
                            autoFocus
                            id="phoneNumber"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            variant="outlined"
                            disabled={true}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">date_range</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Date"
                            autoFocus
                            id="date"
                            name="date"
                            value={this.state.date}
                            variant="outlined"
                            disabled={true}
                            required
                            fullWidth
                        />
                    </div>

                    {this.state.details ? (

                        <div>
                            {
                                this.state.details.map((dName, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="flex">
                                                <div className="min-w-48 pt-20">
                                                    {index + 1}
                                                </div>
                                                <TextField
                                                    className="mb-24"
                                                    label={dName.field_name}
                                                    variant="outlined"
                                                    disabled={true}
                                                    fullWidth
                                                    style={{marginRight: 5}}
                                                    value={dName.value}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : null}

                </DialogContent>

                <DialogActions className="justify-between pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            this.closeComposeDialog();
                        }}
                    >
                        Exit
                    </Button>
                    <IconButton
                        hidden={localStorage.getItem('Role') !== 'superAdmin'}
                        disabled={localStorage.getItem('Role') !== 'superAdmin'}
                        onClick={() => {
                            if (window.confirm('Are you sure to delete this warranty claimed?')) {
                                removeWarrantyRegister(this.state.id);
                                this.closeComposeDialog();
                            }
                        }}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </DialogActions>

            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            closeEditWarrantyClaimedDialog: Actions.closeEditWarrantyClaimedDialog,
            closeNewWarrantyClaimedDialog: Actions.closeNewWarrantyClaimedDialog,
            removeWarrantyClaimed: Actions.removeWarrantyClaimed
        },
        dispatch
    );
}

function mapStateToProps({warrantyClaimedApp}) {
    return {
        warrantyClaimedDialog: warrantyClaimedApp.warrantyClaimed.warrantyClaimedDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarrantyClaimedDialog);
