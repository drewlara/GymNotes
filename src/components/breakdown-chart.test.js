import React from 'react';
import { shallow } from 'enzyme';

import { BreakdownChart } from './breakdown-chart';

describe('<BreakdownChart />', () => {
  it('Renders without crashing', () => {
    shallow(<BreakdownChart workouts={[]} />);
  });
});