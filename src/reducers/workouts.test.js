import workoutReducer from './workouts';
import {
  addWorkout,
  editWorkout,
  deleteWorkout,
  workoutApiSuccess,
  workoutApiRequest,
  workoutApiError,
  clearWorkouts
} from '../actions/workouts';

describe('authReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = workoutReducer(undefined, {type: '_UNKNOWN'});
    expect(state).toEqual({
      workouts: [],
      loading: false,
      error: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = workoutReducer(currentState, {type: '_UNKNOWN'});
    expect(state).toBe(currentState);
  });
});

describe('addWorkout', () => {
  it('Should add a new workout', () => {
    const newWorkout = {
      name: 'Test Workout',
      type: 'Chest',
      weight: 100,
      reps: 10,
      date: Date.now(),
      comments: 'some comments'
    };

    const state = workoutReducer(undefined, addWorkout(newWorkout));
    expect(state).toEqual({
      workouts: [newWorkout],
      loading: false,
      error: null
    });
  });
});

describe('editWorkout', () => {
  it('Should edit an existing workout', () => {
    const newWorkoutData = {
      name: 'Test Workout',
      type: 'Chest',
      weight: 100,
      reps: 10,
      date: Date.now(),
      comments: 'some edited comments',
      id: '12345'
    };
    let state = {
      workouts: [
        {
          name: 'Test Workout',
          type: 'Arms',
          weight: 50,
          reps: 5,
          date: Date.now(),
          comments: 'some comments',
          id: '12345'
        }
      ],
      loading: false,
      error: null
    }
    state = workoutReducer(state, editWorkout(newWorkoutData));
    expect(state).toEqual({
      workouts: [newWorkoutData],
      loading: false,
      error: null
    });
  });
});

describe('deleteWorkout', () => {
  it('Should delete a logged workout', () => {
    const workout = {
      name: 'Test Workout',
      type: 'Arms',
      weight: 50,
      reps: 5,
      date: Date.now(),
      comments: 'some comments',
      id: '12345'
    };
    let state = {
      workouts: [workout],
      loading: false,
      error: null
    };
    state = workoutReducer(state, deleteWorkout(workout));
    expect(state).toEqual({
      workouts: [],
      loading: false,
      error: null
    });
  });
});

describe('workoutApiSuccess', () => {
  it('Should set loading to false and error to null', () => {
    let state = {
      workouts: [],
      loading: true,
      error: 'some-error'
    };
    state = workoutReducer(state, workoutApiSuccess());
    expect(state).toEqual({
      workouts: [],
      loading: false,
      error: null
    });
  });
});

describe('workoutApiRequest', () => {
  it('Should set the state to be loading', () => {
    let state = {
      workouts: [],
      loading: false,
      error: 'some-error'
    };
    state = workoutReducer(state, workoutApiRequest());
    expect(state).toEqual({
      workouts: [],
      loading: true,
      error: null
    });
  });
});

describe('workoutApiError', () => {
  it('Should set an error', () => {
    const error = 'some-error';
    let state = {
      workouts: [],
      loading: false,
      error: null
    };
    state = workoutReducer(state, workoutApiError(error));
    expect(state).toEqual({
      workouts: [],
      loading: false,
      error
    });
  });
});

describe('clearWorkouts', () => {
  it('Should clear the workouts array', () => {
    let state = {
      workouts: [
        {
          name: 'Test Workout',
          type: 'Arms',
          weight: 50,
          reps: 5,
          date: Date.now(),
          comments: 'some comments',
          id: '12345'
        }
      ],
      loading: false,
      error: null
    };
    state = workoutReducer(state, clearWorkouts());
    expect(state).toEqual({
      workouts: [],
      loading: false,
      error: null
    });
  });
});