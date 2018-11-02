import React from 'react';
import { shallow } from 'enzyme';

import { LandingPage } from './landing';

describe('<Landing />', () => {
  it('Renders without crashing', () => {
    shallow(<LandingPage />);
  });

  it('Redirects if user is logged in', () => {
    const wrapper = shallow(<LandingPage loggedIn={true} />);
    expect(wrapper.exists('Redirect')).toEqual(true);
  })
});