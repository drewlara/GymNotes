import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './login-form';
import './login.css';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm />
      <span className="to-register">Don't have a GymNotes Account? <Link to={'/register'}>Sign Up!</Link></span>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
