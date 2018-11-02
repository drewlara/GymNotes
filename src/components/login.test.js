import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from './login';

describe('<Login />', () => {
  it('Renders without crashing', () => {
    shallow(<LoginPage />);
  });

  it('Redirects if user is logged in', () => {
    const wrapper = shallow(<LoginPage loggedIn={true} />);
    expect(wrapper.exists('Redirect')).toEqual(true);
  })
});