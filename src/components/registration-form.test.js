import React from 'react';
import { shallow, mount } from 'enzyme';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { RegistrationForm } from './registration-form';

describe('<RegistrationForm />', () => {
  it('Renders without crashing', () => {
    shallow(<RegistrationForm handleSubmit={jest.fn()}/>);
  });
});