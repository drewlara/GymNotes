import authReducer from './auth';
import {setAuthToken, clearAuth, authRequest, authSuccess, authError} from '../actions/auth';

describe('authReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = authReducer(undefined, {type: '_UNKNOWN'});
    expect(state).toEqual({
      authToken: null, 
      currentUser: null,
      loading: false,
      error: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = authReducer(currentState, {type: '_UNKNOWN'});
    expect(state).toBe(currentState);
  });
});

describe('setAuthToken', () => {
  it('Should set the auth token of the user', () => {
    const state = authReducer(undefined, setAuthToken('some-token'));
    expect(state).toEqual({
      authToken: 'some-token',
      currentUser: null,
      loading: false,
      error: null
    });
  });
});

describe('clearAuth', () => {
  it('Should clear the auth token and current user', () => {
    let state = {
      authToken: 'some-token', 
      currentUser: 'some-user'
    }
    state = authReducer(state, clearAuth());
    expect(state).toEqual({
      authToken: null,
      currentUser: null
    });
  });
});

describe('authRequest', () => {
  it('Should set the state to be loading', () => {
    let state = {
      loading: false,
      error: 'some error'
    }
    state = authReducer(state, authRequest());
    expect(state).toEqual({
      loading: true,
      error: null
    });
  });
});

describe('authSuccess', () => {
  it('Should set the currentUser', () => {
    const currentUser = 'testuser';
    let state = {
      loading: true,
      currentUser: null
    }
    state = authReducer(state, authSuccess(currentUser));
    expect(state).toEqual({
      loading: false,
      currentUser
    });
  });
});

describe('authError', () => {
  it('Should set the error', () => {
    const error = 'some error';
    let state = {
      loading: true,
      error: null
    }
    state = authReducer(state, authError(error));
    expect(state).toEqual({
      loading: false,
      error
    });
  });
});