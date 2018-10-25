export const ADD_WORKOUT = 'ADD_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

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
})