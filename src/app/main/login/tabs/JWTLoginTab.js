import React, { Component } from 'react';
import {
  Button,
  Divider,
  Typography,
  InputAdornment,
  Icon
} from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Base_URL } from '../../../server';

class JWTLoginTab extends Component {
  state = {
    canSubmit: false
  };

  form = React.createRef();

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    // const role = {
    //   role: 'superAdmin'
    // };
    // const data = { ...model, ...role };
    // console.log('model :', model);
    this.props.submitLogin(model);
  };
  componentWillMount() {
    // /verify-token
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios
        // .post(Base_URL+'admin-auth/verify-token', { token })
        .post(Base_URL+'admin-auth/verify-token', { token })
        .then(res => {
          // Set current user
          this.props.setCurrentUser(res.data);
        })

        .then(() => this.props.history.push('/dashboard'))
        .then(() => window.location.reload())

        .catch(err => {
          console.log('err', err);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const token = localStorage.getItem('jwtToken');
    if (token) {                                            //Token Check
      if (nextProps.login.isAuthenticated) {
        this.props.history.push('/dashboard');
        window.location.reload();
      }
    }
    else
    {
      console.log('Erroorss');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.error &&
      (this.props.login.error.email || this.props.login.error.password)
    ) {
      this.form.updateInputsWithError({
        ...this.props.login.error
      });

      this.props.login.error = null;
      this.disableButton();
    }

    return null;
  }

  render() {
    const { canSubmit } = this.state;
console.log('asda', this.props.login)
    return (
      <div className="w-full">
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref={form => (this.form = form)}
          className="flex flex-col justify-center w-full"
        >
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="email"
            label="Username/Email"
            validations={{
              minLength: 4
            }}
            validationErrors={{
              minLength: 'Min character length is 4'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    email
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <TextFieldFormsy
            className="mb-16"
            type="password"
            name="password"
            label="Password"
            validations={{
              minLength: 4
            }}
            validationErrors={{
              minLength: 'Min character length is 4'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    vpn_key
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16 normal-case"
            aria-label="LOG IN"
            disabled={!canSubmit}
            value="legacy"
          >
            Login
          </Button>
        </Formsy>

        <div className="flex flex-col items-center pt-24">
          <Divider className="mb-16 w-256" />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: authActions.loginBrandUser,
      verifyToken: authActions.verifyToken,
      setCurrentUser: authActions.setCurrentUser
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JWTLoginTab)
);
