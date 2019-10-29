import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Contract.css';
import CustomButton from '../CustomButton/CustomButton';
import Modal from '../Modal/Modal';
import CustomDateConverter from '../CustomDateConverter/CustomDateConverter';
import Form from '../Form/Form';

export interface ContractObj {
  company: string;
  negotiationRenewalDate: string;
  periodEnd: string;
  periodStart: string;
  scheduleForRenewal: boolean;
  contractId?: string;
}

interface Props {
  contractInfo: ContractObj;
  refreshContracts: () => void;
}

export const Contract: React.FC<Props> = props => {
  const { contractInfo, refreshContracts } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    company,
    negotiationRenewalDate,
    periodEnd,
    periodStart,
    scheduleForRenewal
  } = contractInfo;

  // to open Modal
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  //to close Modal
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  //update contract after refresh
  const updateContract = () => {
    refreshContracts();
  };

  return (
    <div className="ContractItem">
      <div className="ContractDetails">
        <div className="CompanyName">
          <div className="CompanyIcon">
            <i className="fa fa-industry" aria-hidden="true"></i>
          </div>
        </div>
        <ul>
          <li>
            <span>{company}</span>
          </li>
          <li>
            <strong>Start : </strong>
            <span>
              <CustomDateConverter date={periodStart} />
            </span>
          </li>
          <li>
            <strong>End : </strong>
            <span>
              <CustomDateConverter date={periodEnd} />
            </span>
          </li>
          {scheduleForRenewal ? (
            <li>
              <strong> Renewal Date : </strong>
              <span>
                <CustomDateConverter date={negotiationRenewalDate} />
              </span>
            </li>
          ) : (
            <span
              style={{ color: '#888', fontSize: '12px', marginTop: '20px' }}
            >
              Not schedule for renewal
            </span>
          )}
        </ul>
        <CustomButton click={openModalHandler} btnType="button">
          Edit
        </CustomButton>
      </div>
      {isModalOpen ? (
        <Modal closeModal={closeModalHandler} modalState={isModalOpen}>
          <Form
            contractInfo={contractInfo}
            updateContract={updateContract}
            closeModal={closeModalHandler}
          ></Form>
        </Modal>
      ) : null}
    </div>
  );
};

export default Contract;
