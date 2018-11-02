import React from 'react';
import { shallow } from 'enzyme';

import { Workouts } from './workouts';

describe('<Workouts />', () => {
  it('Renders without crashing', () => {
    shallow(<Workouts workouts={[]} />);
  });
});