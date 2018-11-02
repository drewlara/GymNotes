import React from 'react';
import { shallow } from 'enzyme';

import { Sidebar } from './sidebar';

describe('<Sidebar />', () => {
  it('Renders without crashing', () => {
    shallow(<Sidebar />);
  });

  it('Displays user links when user is logged in', () => {
    const wrapper = shallow(<Sidebar loggedIn={true} currentUser={{firstName: 'test'}} />);
    expect(wrapper.exists('.user-links')).toEqual(true);
  });
});