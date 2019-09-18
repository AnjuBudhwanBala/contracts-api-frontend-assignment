import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Contract from '../../components/Contract/Contract';

const Contracts = () => {
  const [contractsData, setContractsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchContracts = () => {
    axios
      .get(
        'https://europe-west1-contracts-app-cb26b.cloudfunctions.net/contracts'
      )
      .then(response => {
        setContractsData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchContracts();
    return () => {
      console.log('componentWillUnmount');
    };
  }, []);

  const refreshContracts = () => {
    fetchContracts();
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  } else {
    if (error) {
      return <p>Sorry we are unable to fetch Contracts</p>;
    } else {
      if (contractsData.length === 0) {
        return <p>You do not have any contracts</p>;
      } else {
        return contractsData.map(data => (
          <Contract
            key={data.contractId}
            contractInfo={data}
            refreshContracts={refreshContracts}
          ></Contract>
        ));
      }
    }
  }
};

export default Contracts;
