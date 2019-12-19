import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Typography,
  Toolbar,
  AppBar
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";
import _ from "@lodash";

const newNotificationState = {
  title: "",
  message: "",
  sender: localStorage.getItem('id')
};

class NotificationDialog extends Component {
  state = { ...newNotificationState };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.notificationDialog.props.open &&
      this.props.notificationDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.notificationDialog.type === "edit" &&
        this.props.notificationDialog.data &&
        !_.isEqual(this.props.notificationDialog.data, prevState)
      ) {
        this.setState({ ...this.props.notificationDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.notificationDialog.type === "new" &&
        !_.isEqual(newNotificationState, prevState)
      ) {
        this.setState({ ...newNotificationState });
      }
    }
  }

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
    );
  };

  closeComposeDialog = () => {
    this.props.notificationDialog.type === "edit"
      ? this.props.closeEditNotificationDialog()
      : this.props.closeNewNotificationDialog();
  };

  canBeSubmitted() {
    const { title } = this.state;
    return title.length > 0;
  }

  render() {
    const {
      notificationDialog,
      addNotification
    } = this.props;

    return (
      <Dialog
        classes={{
          paper: "m-24"
        }}
        {...notificationDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {notificationDialog.type === "new"
                ? "New Notification"
                : "View Notification"}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Title"
              autoFocus
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              disabled={notificationDialog.type === "new" ? false:true}
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
                label="Message"
                multiline
                id="message"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                disabled={notificationDialog.type === "new" ? false:true}
                variant="outlined"
                required
                fullWidth
            />
          </div>
        </DialogContent>

        {notificationDialog.type === "new" ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addNotification(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Send Notification
            </Button>
          </DialogActions>
        ) : ''
        }
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditNotificationDialog: Actions.closeEditNotificationDialog,
      closeNewNotificationDialog: Actions.closeNewNotificationDialog,
      addNotification: Actions.addNotification,
    },
    dispatch
  );
}

function mapStateToProps({ notificationsApp }) {
  return {
    notificationDialog: notificationsApp.notifications.notificationDialog
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDialog);