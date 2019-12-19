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

const newSurveyState = {
    name: '',
    id: ''
};

class SurveyDialog extends Component {
    state = {...newSurveyState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.surveyDialog.props.open &&
            this.props.surveyDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.surveyDialog.type === 'edit' &&
                this.props.surveyDialog.data &&
                !_.isEqual(this.props.surveyDialog.data, prevState)
            ) {
                this.setState({...this.props.surveyDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.surveyDialog.type === 'new' &&
                !_.isEqual(newSurveyState, prevState)
            ) {
                this.setState({...newSurveyState});
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
        this.props.surveyDialog.type === 'edit'
            ? this.props.closeEditSurveyDialog()
            : this.props.closeNewSurveyDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {surveyDialog, addSurvey, updateSurvey, removeSurvey} = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...surveyDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {surveyDialog.type === 'new' ? 'New Survey' : 'Edit Survey'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="survey avatar"
              src={this.state.avatar}
            /> */}
                        {surveyDialog.type === 'edit' && (
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
                            label="Survey Name"
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

                {surveyDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addSurvey(this.state);
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
                                updateSurvey(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' survey?')) {
                                    removeSurvey(this.state.id);
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
            closeEditSurveyDialog: Actions.closeEditSurveyDialog,
            closeNewSurveyDialog: Actions.closeNewSurveyDialog,
            addSurvey: Actions.addSurvey,
            updateSurvey: Actions.updateSurvey,
            removeSurvey: Actions.removeSurvey
        },
        dispatch
    );
}

function mapStateToProps({surveysApp}) {
    return {
        surveyDialog: surveysApp.surveys.surveyDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyDialog);
