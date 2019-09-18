import React from 'react';
import { shallow } from 'enzyme';
import { CustomDateConverter } from './CustomDateConverter';

describe('CustomDateConverter Component', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      date: new Date()
    };

    wrapper = shallow(<CustomDateConverter date={mockProps} />);
  });

  it('should render CustomDateConverter component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
