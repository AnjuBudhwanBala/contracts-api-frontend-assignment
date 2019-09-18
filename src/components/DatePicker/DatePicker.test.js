import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from './DatePicker';

it('should render DatePicker component', () => {
  expect(shallow(<DatePicker />)).toMatchSnapshot();
});
