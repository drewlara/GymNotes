import React from 'react';
import { shallow } from 'enzyme';

import TrackerSelect from './tracker-select';

describe('<TrackerSelect />', () => {
  it('Renders without crashing', () => {
    shallow(<TrackerSelect />);
  });
});