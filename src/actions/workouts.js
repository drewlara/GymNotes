import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const ADD_WORKOUT = 'ADD_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const WORKOUT_API_REQUEST = 'WORKOUT_API_REQUEST';
export const WORKOUT_API_SUCCESS = 'WORKOUT_API_SUCCESS'
export const WORKOUT_API_ERROR = 'WORKOUT_API_ERROR';
export const CLEAR_WORKOUTS = 'CLEAR_WORKOUTS';

export const addWorkout = workout => ({
  type: ADD_WORKOUT,
  workout
});

export const editWorkout = workout => ({
  type: EDIT_WORKOUT,
  workout
});

export const deleteWorkout = workout => ({
  type: DELETE_WORKOUT,
  workout
});

export const workoutApiRequest = () => ({
  type: WORKOUT_API_REQUEST
});

export const workoutApiSuccess = () => ({
  type: WORKOUT_API_SUCCESS
})

export const workoutApiError = error => ({
  type: WORKOUT_API_ERROR,
  error
});

export const clearWorkouts = () => ({
  type: CLEAR_WORKOUTS
})

export const workoutGet = () => (dispatch, getState) => {
  dispatch(workoutApiRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/workouts`, {
    method: 'GET',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
      dispatch(workoutApiSuccess());
      if (data.length > 0) {
        data.forEach(workout => dispatch(addWorkout(workout)));
      }
    })
    .catch(err => {
      dispatch(workoutApiError(err));
    });
}

export const workoutPost = (workout) => (dispatch, getState) => {
  dispatch(workoutApiRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/workouts`, {
    method: 'POST',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json'
    },
    body: JSON.stringify(workout)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
      dispatch(workoutApiSuccess());
      dispatch(addWorkout(data));
    })
    .catch(err => {
      dispatch(workoutApiError(err));
    })

}

export const workoutPut = (workout) => (dispatch, getState) => {
  dispatch(workoutApiRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
    method: 'PUT',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json'
    },
    body: JSON.stringify(workout)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
      dispatch(workoutApiSuccess());
      dispatch(editWorkout(data));
    })
    .catch(err => {
      dispatch(workoutApiError(err));
    })

}

export const workoutDelete = (workout) => (dispatch, getState) => {
  dispatch(workoutApiRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
    method: 'DELETE',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
      dispatch(workoutApiSuccess());
      dispatch(deleteWorkout(data));
    })
    .catch(err => {
      dispatch(workoutApiError(err));
    })

}