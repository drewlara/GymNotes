import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './date-picker';

describe('<DatePicker />', () => {
  it('Renders without crashing', () => {
    shallow(<DatePicker input={{onChange: jest.fn()}} />)
  })
})