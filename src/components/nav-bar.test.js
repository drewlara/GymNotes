import React from 'react';
import { shallow } from 'enzyme';

import { NavBar } from './nav-bar';

describe('<NavBar />', () => {
  it('Renders without crashing', () => {
    shallow(<NavBar />);
  });

  it('Displays user links if user is logged in', () => {
    const wrapper = shallow(<NavBar loggedIn={true} />);
    expect(wrapper.exists('.user-links')).toEqual(true);
  });
});