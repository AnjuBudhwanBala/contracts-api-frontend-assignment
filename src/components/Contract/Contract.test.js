import React from 'react';
import { shallow } from 'enzyme';
import Contract from './Contract';

describe('Contract Component', () => {
  let wrapper;
  let mockRefreshContracts;
  let mockContracts = [
    { contractId: 'contractId01' },
    { contractId: 'contractId02' }
  ];

  beforeEach(() => {
    mockRefreshContracts = jest.fn();

    const mockProps = {
      contractInfo: mockContracts,
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
