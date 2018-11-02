import React from 'react';
import { shallow } from 'enzyme';

import { RegistrationPage } from './register';

describe('<RegistrationPage />', () => {
  it('Renders without crashing', () => {
    shallow(<RegistrationPage />);
  });

  it('Redirects if user is logged in', () => {
    const wrapper = shallow(<RegistrationPage loggedIn={true} />);
    expect(wrapper.exists('Redirect')).toEqual(true);
  });

});