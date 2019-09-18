import React from 'react';
import { shallow } from 'enzyme';
import Contract from './Contract';
import { renderHook, act } from '@testing-library/react-hooks';
import CustomButton from '../CustomButton/CustomButton';

describe('Contract Component', () => {
  let wrapper;
  let mockRefreshContracts;

  beforeEach(() => {
    mockRefreshContracts = jest.fn();

    const mockProps = {
      contractInfo: {
        company: 'abc'
      },
      refreshContracts: mockRefreshContracts
    };

    wrapper = shallow(<Contract {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Contract component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
