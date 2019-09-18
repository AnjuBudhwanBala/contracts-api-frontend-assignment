import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

describe('Form Component', () => {
  let wrapper;
  let mockUpdateContracts;
  let mockCloseModal;

  beforeEach(() => {
    mockUpdateContracts = jest.fn();
    mockCloseModal = jest.fn();
    const mockProps = {
      contractInfo: {},
      updateContract: mockUpdateContracts,
      closeModal: mockCloseModal
    };

    wrapper = shallow(<Form {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Form component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
