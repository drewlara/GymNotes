import React from 'react';
import { Redirect } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';
import { clearAuth } from '../actions/auth';
import { clearWorkouts } from '../actions/workouts';
import { connect } from 'react-redux';

export function Logout(props){
  props.dispatch(clearAuth());
  props.dispatch(clearWorkouts());
  clearAuthToken();
  return (
    <Redirect to="/" />
  )
}

export default connect()(Logout);