import React from 'react';
import { shallow } from 'enzyme';

import { TrackerChart } from './tracker-chart';

describe('<TrackerChart />', () => {
  it('Renders without crashing', () => {
    shallow(<TrackerChart workouts={[]} />);
  });
});