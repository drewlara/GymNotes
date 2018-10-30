import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './login-form';
import './login.css';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
