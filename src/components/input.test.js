import React from 'react';
import { shallow } from 'enzyme';

import Input from './input';

describe('<Input />', () => {
  it('Renders without crashing', () => {
    shallow(<Input meta={{error: false, touched: false}} input={{name: 'input'}} />);
  });

  it('Displays error if there is an error', () => {
    const wrapper = shallow(<Input meta={{error: 'some error', touched: true}} input={{name: 'input'}} />)
    expect(wrapper.exists('.form-error')).toEqual(true);
  })

  it('Displays warning if there is an warning', () => {
    const wrapper = shallow(<Input meta={{error: false, touched: true, warning: 'some warning'}} input={{name: 'input'}} />)
    expect(wrapper.exists('.form-warning')).toEqual(true);
  })
});