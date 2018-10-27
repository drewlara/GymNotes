import { ADD_WORKOUT, EDIT_WORKOUT, DELETE_WORKOUT, WORKOUT_API_REQUEST, WORKOUT_API_SUCCESS, WORKOUT_API_ERROR, CLEAR_WORKOUTS } from '../actions/workouts';

const initialState = {
  workouts: [],
  loading: false,
  error: null
}

export default (state=initialState, action) => {
  if (action.type === ADD_WORKOUT){
    return Object.assign({}, state, {
      workouts: [...state.workouts, action.workout]
    });
  }
  else if (action.type === EDIT_WORKOUT){
    return Object.assign({}, state, {
      workouts: state.workouts.map(workout => workout.id === action.workout.id ? action.workout : workout)
    });
  }
  else if (action.type === DELETE_WORKOUT){
    const newState = {workouts: state.workouts.filter(workout => workout.id !== action.workout.id)}
    return Object.assign({}, state, newState);
  }
  else if (action.type === WORKOUT_API_REQUEST){
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === WORKOUT_API_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      error: null
    });
  }
  else if (action.type === WORKOUT_API_ERROR){
    console.log(action.error);
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === CLEAR_WORKOUTS){
    return Object.assign({}, state, initialState);
  }
  return state;
}