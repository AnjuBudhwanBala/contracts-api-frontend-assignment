import React, { useEffect, useReducer } from 'react';
import axios from '../../axiosUrl';
import Spinner from '../../components/Spinner/Spinner';
import Contract from '../../components/Contract/Contract';
import { ContractObj } from '../../components/Contract/Contract';

interface Props {}

type State = {
  loading: boolean;
  error: boolean;
  contractsData: ContractObj[];
};

type Action =
  | { type: 'FETCH_SUCCESS'; payload: ContractObj[] }
  | { type: 'FETCH_ERROR' };

const initialState: State = {
  loading: true,
  error: false,
  contractsData: []
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: false,
        contractsData: action.payload
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: true,
        contractsData: []
      };
    default: {
      return state;
    }
  }
};
export const Contracts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContracts = () => {
    axios
      .get('/contracts')
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR' });
      });
  };

  useEffect(() => {
    fetchContracts();
    return fetchContracts;
  }, []);

  const refreshContracts = () => {
    fetchContracts();
  };

  if (state.loading) {
    return (
      <>
        <Spinner isLoading={state.loading} />
      </>
    );
  } else {
    if (state.error) {
      return (
        <>
          <p id="error">Sorry we are unable to fetch Contracts</p>
        </>
      );
    } else {
      if (state.contractsData.length === 0) {
        return (
          <>
            <p>You do not have any contracts</p>
          </>
        );
      } else {
        return (
          <>
            {state.contractsData.map(data => (
              <Contract
                key={data.contractId}
                contractInfo={data}
                refreshContracts={refreshContracts}
              ></Contract>
            ))}
          </>
        );
      }
    }
  }
};

export default Contracts;
