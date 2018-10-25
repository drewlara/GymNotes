import { ADD_WORKOUT, EDIT_WORKOUT, DELETE_WORKOUT } from '../actions/workouts';
/*import uuid from 'uuid';

var start = new Date('20 Sep 2018').getTime();

function seedWorkouts() {
  const types = ['Arms', 'Shoulders', 'Back', 'Chest', 'Legs'];
  const names = ['aaaaaaa', 'bbbbbbbb', 'ccccc'];
  let id = uuid();
  const newWorkout = {
    type: types[Math.floor(Math.random() * 5)],
    weight: Math.floor(Math.random() * 101) + 40,
    reps: Math.floor(Math.random() * 21) + 5,
    name: names[Math.floor(Math.random() * 3)],
    comments: 'seeded workouts',
    date: start,
    id
  }
  return newWorkout
}

function generateWorkoutData(){
  const workouts = []
  for (let i = 0; i < 74; i++){
    workouts.push(seedWorkouts());
    start += (86400000 - 2)/2
  }
  return workouts;
}*/

const initialState = {
  workouts: []
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
  return state;
}