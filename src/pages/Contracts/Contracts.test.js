import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner/Spinner';
import Contract from '../../components/Contract/Contract';
import { Contracts } from './Contracts';

describe('Contracts Component', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Contracts component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
