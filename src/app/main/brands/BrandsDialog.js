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

const newBrandState = {
    name: '',
    companyId: ''
    // id: ''
};

class BrandDialog extends Component {
    state = {...newBrandState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.brandDialog.props.open &&
            this.props.brandDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.brandDialog.type === 'edit' &&
                this.props.brandDialog.data &&
                !_.isEqual(this.props.brandDialog.data, prevState)
            ) {
                this.setState({...this.props.brandDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.brandDialog.type === 'new' &&
                !_.isEqual(newBrandState, prevState)
            ) {
                this.setState({...newBrandState});
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
        this.props.brandDialog.type === 'edit'
            ? this.props.closeEditBrandDialog()
            : this.props.closeNewBrandDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {brandDialog, addBrand, updateBrand, removeBrand} = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...brandDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {brandDialog.type === 'new' ? 'New Brand' : 'Edit Brand'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">

                        {brandDialog.type === 'edit' && (
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
                        <TextField
                            className="mb-24"
                            label="Select Company"
                            id="companyId"
                            name="companyId"
                            select
                            value={this.state.companyId}
                            onChange={this.handleChange}

                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {this.props.companies.map(option => {

                                return (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                );
                            })}
                        </TextField>
                    </div>
                </DialogContent>

                {brandDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addBrand(this.state);
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
                                updateBrand(this.state);
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
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' brand?')) {
                                    removeBrand(this.state.id);
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
            closeEditBrandDialog: Actions.closeEditBrandDialog,
            closeNewBrandDialog: Actions.closeNewBrandDialog,
            addBrand: Actions.addBrand,
            updateBrand: Actions.updateBrand,
            removeBrand: Actions.removeBrand
        },
        dispatch
    );
}

function mapStateToProps({brandsApp}) {
    return {
        brandDialog: brandsApp.brands.brandDialog,
        companies: brandsApp.brands.companies
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandDialog);
