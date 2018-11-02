import React from 'react';
import { shallow } from 'enzyme';

import NumberInput from './workout-number-input';

describe('<NumberInput />', () => {
  it('Renders without crashing', () => {
    shallow(<NumberInput input={{value: 1, onChange: jest.fn()}} meta={{touched: false, error: false}} />);
  });

  it('Displays error if there is an error', () => {
    const wrapper = shallow(<NumberInput meta={{error: 'some error', touched: true}} input={{name: 'input', value: 1, onChange: jest.fn()}} workouts={[]} />)
    expect(wrapper.exists('.form-error')).toEqual(true);
  });

  it('Displays warning if there is an warning', () => {
    const wrapper = shallow(<NumberInput meta={{error: false, touched: true, warning: 'some warning'}} input={{name: 'input', value: 1, onChange: jest.fn()}} workouts={[]} />)
    expect(wrapper.exists('.form-warning')).toEqual(true);
  });
});