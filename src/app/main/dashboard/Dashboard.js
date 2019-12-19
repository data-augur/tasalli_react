import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {FusePageSimple} from "@fuse";

const styles = theme => ({
    layoutRoot: {}
});

class Dashboard extends Component {
    render() {
        if (!localStorage.getItem('jwtToken')) {
            window.location = '/login';
        }
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                // header={
                //     <div className="p-24"><h4>Header</h4></div>
                // }
                // contentToolbar={
                //     <div className="px-24"><h4>Content Toolbar</h4></div>
                // }
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(Dashboard);
