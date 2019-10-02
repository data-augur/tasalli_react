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
    const role = {
      role: 'superAdmin'
    };
    const data = { ...model, ...role };
    this.props.submitLogin(data);
  };

  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.props.history.push('/');
    }

    // const token = localStorage.getItem('jwtToken');
    // if (token) {
    //   var bearer = token.split(' ');
    //   console.log('bearer[1] :', bearer[1]);

    //   try {
    //     const decoded = jwt.verify(bearer[1], 'secret');
    //     console.log('decoded :', decoded);
    //     if (decoded) {
    //       console.log('decoded :', decoded);
    //       this.props.history.push('/');
    //     }
    //   } catch (err) {
    //     if (err) {
    //       console.log(err);
    //       this.props.history.push('/login');
    //     }
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.isAuthenticated) {
      this.props.history.push('/');
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
      submitLogin: authActions.loginUser
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
