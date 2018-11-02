import React from 'react';
import { shallow } from 'enzyme';

import SidebarToggle from './sidebar-toggle';

describe('<SidebarToggle />', () => {
  it('Renders without crashing', () => {
    shallow(<SidebarToggle />);
  });

  it('Fires toggle callback when clicked', () => {
    const callback = jest.fn();
    const wrapper = shallow(<SidebarToggle toggle={callback} />);
    wrapper.find('.toggle-button').simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});