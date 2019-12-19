import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';

class Error404Page extends Component {
    // state = {
    //     tabValue: 0
    // };
    render() {
        // const { classes } = this.props;
        // const { tabValue } = this.state;
        return (
            <div className="flex flex-col flex-1 items-center justify-center p-16">

                <div className="max-w-512 text-center">

                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" color="inherit" className="font-medium mb-16">
                            404
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={500}>
                        <Typography variant="h5" color="textSecondary" className="mb-16">
                            Sorry but we could not find the page you are looking for
                        </Typography>
                    </FuseAnimate>


                    <Link className="font-medium" to="/dashboard">Go back to dashboard</Link>
                </div>
            </div>
        );
    }
}

/*
function Error404Page()
{
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">

            <div className="max-w-512 text-center">

                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <Typography variant="h1" color="inherit" className="font-medium mb-16">
                        404
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={500}>
                    <Typography variant="h5" color="textSecondary" className="mb-16">
                        Sorry but we could not find the page you are looking for
                    </Typography>
                </FuseAnimate>

                <Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16" elevation={1}>
                    <Icon color="action">search</Icon>
                </Paper>

                <Link className="font-medium" to="/">Go back to dashboard</Link>
            </div>
        </div>
    );
}
*/

export default Error404Page;
