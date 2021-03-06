import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../CustomButton/CustomButton';
import './Form.css';
import Moment from 'moment';
import axios from '../../axiosUrl';
import Spinner from '../Spinner/Spinner';
import DatePicker from '../DatePicker/DatePicker';
import { ContractObj } from '../Contract/Contract';

const useStyles = makeStyles(theme => ({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  radio: {
    '&$checked': {
      color: 'rgb(0, 132, 132)'
    }
  },
  checked: {}
}));

export interface Idata {
  negotiationRenewalDate?: Moment.Moment;
  periodStart?: Moment.Moment;
  periodEnd?: Moment.Moment;
  scheduleForRenewal?: boolean;
}

var data: Idata = {};

interface Props {
  contractInfo: ContractObj;
  updateContract: () => void;
  closeModal: () => void;
}

export const Form: React.FC<Props> = ({
  contractInfo,
  updateContract,
  closeModal
}) => {
  const {
    company,
    contractId,
    negotiationRenewalDate,
    periodEnd,
    periodStart,
    scheduleForRenewal
  } = contractInfo;

  //date conversion using Moment Library
  const contractStartDate = Moment(periodStart, 'YYYY-MM-DDTHH:mm:ss.sssZ');
  const contractEndDate = Moment(periodEnd, 'YYYY-MM-DDTHH:mm:ss.sssZ');
  const contractRenewalDate = Moment(
    negotiationRenewalDate,
    'YYYY-MM-DDTHH:mm:ss.sssZ'
  );
  const scheduleValue = scheduleForRenewal;

  //initial state values
  const [startDate, setStartDate] = useState(contractStartDate);
  const [endDate, setEndDate] = useState(contractEndDate);
  const [schedule, setSchedule] = useState(scheduleValue);
  const [renewalDate, setRenewalDate] = useState(contractRenewalDate);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //styles to use inside materialUI form Component
  const classes = useStyles();

  useEffect(() => {
    data = {};
  }, []);

  useEffect(() => {
    new Date(startDate.toString()).getTime() >
    new Date(endDate.toString()).getTime()
      ? setError(true)
      : setError(false);
  }, [startDate, endDate]);

  //radio button handler
  const handleChange = (event: React.FormEvent<HTMLInputElement>): Idata => {
    //console.log('event', event);
    event.currentTarget.value === 'yes'
      ? setSchedule(true)
      : setSchedule(false);
    data['scheduleForRenewal'] =
      event.currentTarget.value === 'yes' ? true : false;
    return data;
  };

  //form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    axios({
      method: 'patch',
      url: `/contracts/${contractId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then(response => {
        setLoading(false);
        updateContract();
        closeModal();

        //return response.json;
      })
      .catch(error => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  } else {
    return (
      <div>
        <div className="CompanyIcon">
          <i className="fa fa-industry" aria-hidden="true"></i>
        </div>
        <div className="name">{company}</div>
        <form onSubmit={handleSubmit}>
          <DatePicker
            labelValue="Contract Start Date"
            dateValue={startDate}
            id="start"
            error={error}
            change={date => {
              setStartDate(date);
              data['periodStart'] = date;
            }}
          />
          <br />
          <DatePicker
            labelValue="Contract End Date"
            dateValue={endDate}
            id="end"
            error={error}
            change={date => {
              setEndDate(date);
              data['periodEnd'] = date;
            }}
          />

          {error ? (
            <p style={{ fontSize: '11px', color: 'red' }}>
              Contract start date can not be greater than end date
            </p>
          ) : null}

          <p>
            <label>Schedule for Renewal Contract?</label>
          </p>
          <RadioGroup
            aria-label="renewal"
            name="renewal"
            value={schedule ? 'yes' : 'no'}
            onChange={handleChange}
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="No"
            />
          </RadioGroup>
          {schedule ? (
            <DatePicker
              labelValue="Renew Contract"
              dateValue={renewalDate}
              id="renewal"
              change={date => {
                setRenewalDate(date);
                data['negotiationRenewalDate'] = date;
              }}
            />
          ) : null}

          <CustomButton btnType="submit" isDisabled={error}>
            Submit
          </CustomButton>
        </form>
      </div>
    );
  }
};

export default Form;
