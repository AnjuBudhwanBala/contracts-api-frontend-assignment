import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Contract.css';
import CustomButton from '../CustomButton/CustomButton';
import Modal from '../../components/Modal/Modal';
import CustomDateConverter from '../CustomDateConverter/CustomDateConverter';

const Contract = ({ contractInfo }) => {
  const [modalState, setModalState] = useState(false);
  const {
    company,
    negotiationRenewalDate,
    periodEnd,
    periodStart,
    scheduleForRenewal
  } = contractInfo;

  const openModalHandler = () => {
    setModalState(true);
  };
  const closeModalHandler = () => {
    setModalState(false);
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
            <span>{company} </span>
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
            <span className="disabledText">Not schedule for renewal</span>
          )}
        </ul>
        <CustomButton
          click={openModalHandler}
          disabled={modalState}
          btnType="button"
        >
          Edit
        </CustomButton>
      </div>
      {modalState ? (
        <Modal
          contractInfo={contractInfo}
          closeModal={closeModalHandler}
          modalState={modalState}
        ></Modal>
      ) : null}
    </div>
  );
};

export default Contract;
