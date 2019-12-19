import React, {Component} from "react";
import {Fab, Icon, withStyles} from "@material-ui/core";
import {FuseAnimate, FusePageSimple} from "@fuse";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withReducer from "app/store/withReducer";
import _ from "@lodash";
import NotificationsList from "./NotificationsList";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsDialog from "./NotificationsDialog";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import "./style.css";
// import { StickyContainer, Sticky } from 'react-sticky';
const styles = theme => ({
    addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class NotificationsApp extends Component {
    componentDidMount() {
        this.props.getNotifications(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getNotifications(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewNotificationDialog} = this.props;
        if (!localStorage.getItem("jwtToken")) {
            window.location = "/login";
        }
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={<NotificationsHeader pageLayout={() => this.pageLayout}/>}
                    content={<NotificationsList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewNotificationDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <NotificationsDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getNotifications: Actions.getNotifications,
            openNewNotificationDialog: Actions.openNewNotificationDialog
        },
        dispatch
    );
}

function mapStateToProps({notificationsApp}) {
    return {
        // notifications: notificationsApp.notifications.entities,
        selectedNotificationIds:
        notificationsApp.notifications.selectedNotificationIds,
        searchText: notificationsApp.notifications.searchText,
        user: notificationsApp.user
    };
}

export default withReducer("notificationsApp", reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(NotificationsApp)
        )
    )
);
