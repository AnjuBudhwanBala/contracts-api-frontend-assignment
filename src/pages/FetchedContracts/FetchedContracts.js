import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Contract from '../../components/Contract/Contract';

const FetchedContracts = () => {
  const [contractsData, setContractsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://europe-west1-contracts-app-cb26b.cloudfunctions.net/contracts'
      )
      .then(response => {
        setContractsData(response.data);
      })
      .catch(error => error);
  }, []);

  return (
    <>
      <div>
        {contractsData.length > 0 ? (
          contractsData.map(data => (
            <Contract key={data.contractId} contractInfo={data}></Contract>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default FetchedContracts;
