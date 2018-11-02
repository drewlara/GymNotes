import React from 'react';
import { shallow } from 'enzyme';

import TypeSelect from './workout-type-select';

describe('<TypeSelect />', () => {
  it('Renders without crashing', () => {
    shallow(<TypeSelect meta={{touched: false, error: false}} input={{onChange: jest.fn()}} />);
  });

  it('Displays error if there is an error', () => {
    const wrapper = shallow(<TypeSelect meta={{error: 'some error', touched: true}} input={{onChange: jest.fn()}} workouts={[]} />)
    expect(wrapper.exists('.form-error')).toEqual(true);
  });

  it('Displays warning if there is an warning', () => {
    const wrapper = shallow(<TypeSelect meta={{error: false, touched: true, warning: 'some warning'}} input={{onChange: jest.fn()}} workouts={[]} />)
    expect(wrapper.exists('.form-warning')).toEqual(true);
  });
});