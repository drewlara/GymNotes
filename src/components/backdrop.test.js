import React from 'react';
import { shallow } from 'enzyme';

import Backdrop from './backdrop';
import { isTrimmed } from '../validators';

describe('<Backdrop />', () => {
  it('Renders without crashing', () => {
    shallow(<Backdrop />);
  });

  it('Should call show() when clicked', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Backdrop show={callback} />);
    const backdropDiv = wrapper.find('div');
    backdropDiv.simulate('click');
    expect(callback).toHaveBeenCalled();
  })
});