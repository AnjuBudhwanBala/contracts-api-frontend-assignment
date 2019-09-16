import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Contract.css';
import Moment from 'react-moment';
import CustomButton from '../CustomButton/CustomButton';
import Modal from '../../components/Modal/Modal';

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
              <Moment format="DD MMM YYYY" date={periodStart}></Moment>
            </span>
          </li>
          <li>
            <strong>End : </strong>
            <span>
              <Moment format="DD MMM YYYY" date={periodEnd}></Moment>
            </span>
          </li>
          {scheduleForRenewal ? (
            <li>
              <strong> Renewal Date : </strong>
              <span>
                <Moment
                  format="DD MMM YYYY"
                  date={negotiationRenewalDate}
                ></Moment>
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
