import React, {Component} from 'react';
import {Card, CardContent, Tab, Tabs, Typography, withStyles} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTLoginTab from './tabs/JWTLoginTab';

const styles = theme => ({
    root: {
        background:
            'linear-gradient(to right, ' +
            theme.palette.primary.dark +
            ' 0%, ' +
            darken(theme.palette.primary.dark, 0.5) +
            ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class Login extends Component {
    state = {
        tabValue: 0
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div
                className={classNames(
                    classes.root,
                    'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0'
                )}
            >
                <div
                    className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                    <FuseAnimate animation="transition.expandIn">
                        <img
                            className="w-128 mb-32"
                            src="assets/images/logos/fuse.svg"
                            alt="logo"
                        />
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to the TASALI!
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>
                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                            <Typography variant="h6" className="text-center md:w-full mb-48">
                                LOGIN TO YOUR ACCOUNT
                            </Typography>

                            <Tabs
                                value={tabValue}
                                onChange={this.handleTabChange}
                                variant="fullWidth"
                                className="mb-32"
                            >
                                <Tab
                                    icon={
                                        <img
                                            className="h-40 p-4 bg-black rounded-12"
                                            src="assets/images/logos/jwt.svg"
                                            alt="firebase"
                                        />
                                    }
                                    className="min-w-0"
                                    label="JWT"
                                />
                            </Tabs>

                            {tabValue === 0 && <JWTLoginTab/>}

                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium">Don't have an account?</span>
                                <Link className="font-medium" to="/su-admin/register">
                                    Create an account
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Login));
