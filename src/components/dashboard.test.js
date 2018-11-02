import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from './dashboard.js';

describe('<Dashboard />', () => {
  it('Renders without crashing', () => {
    shallow(<Dashboard workouts={[]} />);
  })

  it('Renders breakdown chart and current week workouts if there are workouts', () => {
    const testWorkout = {
      name: test,
      type: 'Chest',
      weight: 100,
      reps: 10,
      date: Date.now(),
      comments: 'test comment'
    }
    const wrapper = shallow(<Dashboard workouts={[testWorkout]} />);
    expect(wrapper.exists('.dash-workout-list')).toEqual(true);
    expect(wrapper.exists('.dash-display')).toEqual(true);
  })
})