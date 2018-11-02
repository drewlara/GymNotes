import React from 'react';
import { shallow } from 'enzyme';

import { Tracker } from './tracker';

describe('<Tracker />', () => {
  it('Renders without crashing', () => {
    shallow(<Tracker />);
  });
});