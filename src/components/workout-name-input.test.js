import React from 'react';
import { shallow } from 'enzyme';

import { NameInput } from './workout-name-input';

describe('<NameInput />', () => {
  it('Renders without crashing', () => {
    shallow(<NameInput meta={{touched: false, error: false}} workouts={[]} input={{onChange: jest.fn()}} />);
  });

  it('Displays error if there is an error', () => {
    const wrapper = shallow(<NameInput meta={{error: 'some error', touched: true}} input={{name: 'input'}} workouts={[]} />)
    expect(wrapper.exists('.form-error')).toEqual(true);
  })

  it('Displays warning if there is an warning', () => {
    const wrapper = shallow(<NameInput meta={{error: false, touched: true, warning: 'some warning'}} input={{name: 'input'}} workouts={[]} />)
    expect(wrapper.exists('.form-warning')).toEqual(true);
  })
})