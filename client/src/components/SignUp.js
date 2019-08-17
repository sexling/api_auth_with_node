import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import Input from './reduxCSS/Input';
import * as actions from './actions/index';

function SignUp(props) {
  const onSubmit = async formData => {
    console.log('TCL: onSubmit -> formData', formData);
    await props.signUp(formData);
    if (!props.errorMessage) {
      props.history.push('/dashboard');
    }
  };

  const responseGoogle = async res => {
    console.log('TCL: responseGoogle -> res', res);
    await props.oauthGoogle(res.accessToken);

    if (!props.errorMessage) {
      props.history.push('/dashboard');
    }
  };

  const responseFacebook = async res => {
    console.log('TCL: responseFacebook -> res', res);
    await props.oauthFacebook(res.accessToken);
    if (!props.errorMessage) {
      props.history.push('/dashboard');
    }
  };

  const { handleSubmit } = props;
  return (
    <div>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                placeholder="Please type email"
                label="Please type an Email"
                component={Input}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="Please type password"
                label="Please type a Password"
                component={Input}
              />
            </fieldset>

            {props.errorMessage ? (
              <div className="alert alert-danger">{props.errorMessage}</div>
            ) : null}

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="col">
          <div className="alert alert-primary">
            Or sign up using third party services
          </div>

          <FacebookLogin
            appId="2043782379061582"
            autoLoad={false}
            // textButton="Facebook"
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
              <FacebookLoginButton onClick={renderProps.onClick} />
            )}
          />
          <GoogleLogin
            clientId="258855009640-uih95oqd1nslq65amsjq5a2grn6kselv.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            render={renderProps => (
              <GoogleLoginButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'signup' })
)(SignUp);
