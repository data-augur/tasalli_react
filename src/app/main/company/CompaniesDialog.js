import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newCompanyState = {
    name: ''
};

class CompanyDialog extends Component {
    state = {...newCompanyState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.companyDialog.props.open &&
            this.props.companyDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.companyDialog.type === 'edit' &&
                this.props.companyDialog.data &&
                !_.isEqual(this.props.companyDialog.data, prevState)
            ) {
                this.setState({...this.props.companyDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.companyDialog.type === 'new' &&
                !_.isEqual(newCompanyState, prevState)
            ) {
                this.setState({...newCompanyState});
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
        this.props.companyDialog.type === 'edit'
            ? this.props.closeEditCompanyDialog()
            : this.props.closeNewCompanyDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {
            companyDialog,
            addCompany,
            updateCompany,
            removeCompany
        } = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...companyDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {companyDialog.type === 'new' ? 'New Company' : 'Edit Company'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="company avatar"
              src={this.state.avatar}
            /> */}
                        {companyDialog.type === 'edit' && (
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
                </DialogContent>

                {companyDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCompany(this.state);
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
                                updateCompany(this.state);
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
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' company?')) {
                                    removeCompany(this.state.id);
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
            closeEditCompanyDialog: Actions.closeEditCompanyDialog,
            closeNewCompanyDialog: Actions.closeNewCompanyDialog,
            addCompany: Actions.addCompany,
            updateCompany: Actions.updateCompany,
            removeCompany: Actions.removeCompany
        },
        dispatch
    );
}

function mapStateToProps({companiesApp}) {
    return {
        companyDialog: companiesApp.companies.companyDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyDialog);
