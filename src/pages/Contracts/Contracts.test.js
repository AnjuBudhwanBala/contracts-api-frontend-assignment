import React from 'react';
import { shallow } from 'enzyme';

import { Contracts } from './Contracts';

describe('Contracts Component', () => {
  let wrapper = shallow(<Contracts />);

  it('should render Contracts component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
