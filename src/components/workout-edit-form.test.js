import React from 'react';
import { shallow } from 'enzyme';

import { WorkoutEditForm } from './workout-edit-form';

describe('<WorkoutEditForm />', () => {
  it('Renders without crashing', () => {
    shallow(<WorkoutEditForm handleSubmit={jest.fn()} />);
  });
});