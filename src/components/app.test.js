import React from 'react';
import { shallow } from 'enzyme';

import { App } from './app';

describe('<App />', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });

  it('Toggles sidebar/backdrop', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().sidebarClickHandler();
    expect(wrapper.state('sideBarOpen')).toEqual(true);
    wrapper.instance().backdropClickHandler();
    expect(wrapper.state('sideBarOpen')).toEqual(false);
  })
});