import {
  addWorkout, ADD_WORKOUT, 
  editWorkout, EDIT_WORKOUT, 
  deleteWorkout, DELETE_WORKOUT, 
  workoutApiSuccess, WORKOUT_API_SUCCESS,
  workoutApiRequest, WORKOUT_API_REQUEST,
  workoutApiError, WORKOUT_API_ERROR,
  clearWorkouts, CLEAR_WORKOUTS,
  workoutGet,
  workoutPost,
  workoutPut,
  workoutDelete
} from './workouts'

describe('addWorkout', () => {
  it('Should return the action', () => {
    const workout = 'some workout';
    const action = addWorkout(workout);
    expect(action.type).toEqual(ADD_WORKOUT);
    expect(action.workout).toEqual(workout);
  });
});

describe('editWorkout', () => {
  it('Should return the action', () => {
    const workout = 'some workout';
    const action = editWorkout(workout);
    expect(action.type).toEqual(EDIT_WORKOUT);
    expect(action.workout).toEqual(workout);
  });
});

describe('deleteWorkout', () => {
  it('Should return the action', () => {
    const workout = 'some workout';
    const action = deleteWorkout(workout);
    expect(action.type).toEqual(DELETE_WORKOUT);
    expect(action.workout).toEqual(workout);
  });
});

describe('workoutApiSuccess', () => {
  it('Should return the action', () => {
    const action = workoutApiSuccess();
    expect(action.type).toEqual(WORKOUT_API_SUCCESS);
  });
});

describe('workoutApiRequest', () => {
  it('Should return the action', () => {
    const action = workoutApiRequest();
    expect(action.type).toEqual(WORKOUT_API_REQUEST);
  });
});

describe('workoutApiError', () => {
  it('Should return the action', () => {
    const error = 'some error'
    const action = workoutApiError(error);
    expect(action.type).toEqual(WORKOUT_API_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('clearWorkouts', () => {
  it('Should return the action', () => {
    const action = clearWorkouts();
    expect(action.type).toEqual(CLEAR_WORKOUTS);
  });
});