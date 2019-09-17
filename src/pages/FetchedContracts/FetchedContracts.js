import React, { useEffect, useState } from 'react';
import axios from '../../axiosUrl';
import Spinner from '../../components/Spinner/Spinner';
import Contract from '../../components/Contract/Contract';

const FetchedContracts = () => {
  const [contractsData, setContractsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('/')
      .then(response => {
        setContractsData(response.data);
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <div>
        {contractsData.length > 0 ? (
          contractsData.map(data => {
            return (
              <Contract key={data.contractId} contractInfo={data}></Contract>
            );
          })
        ) : (
          <Spinner isLoading={loading} />
        )}
        {error ? 'Sorry we are unable to fetch Contracts' : null}
      </div>
    </>
  );
};

export default FetchedContracts;
