import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageSimple, DemoContent } from "@fuse";

const styles = theme => ({
  layoutRoot: {}
});

class Example extends Component {
  render() {
    const { classes } = this.props;
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

export default withStyles(styles, { withTheme: true })(Example);
