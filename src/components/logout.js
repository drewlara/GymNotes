import React from 'react';
import { Redirect } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';
import { clearAuth } from '../actions/auth'
import { connect } from 'react-redux';

export function Logout(props){
  props.dispatch(clearAuth());
  clearAuthToken();
  return (
    <Redirect to="/" />
  )
}

export default connect()(Logout);