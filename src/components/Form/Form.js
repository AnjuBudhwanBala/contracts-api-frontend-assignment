import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../CustomButton/CustomButton';
import './Form.css';
import Moment from 'moment';
import axios from '../../axiosUrl';
import Spinner from '../../components/Spinner/Spinner';
import DatePicker from '../DatePicker/DatePicker';

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

export const Form = ({ contractInfo, updateContract, closeModal }) => {
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
  let radioChecked = 'yes';
  if (scheduleValue === true) {
    radioChecked = 'no';
  } else {
    radioChecked = 'yes';
  }

  //initial state values
  const [radioValue, setRadioValue] = useState(radioChecked);
  const [startDate, setStartDate] = useState(contractStartDate);
  const [endDate, setEndDate] = useState(contractEndDate);
  const [schedule, setSchedule] = useState(scheduleValue);
  const [renewalDate, setRenewalDate] = useState(contractRenewalDate);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //styles to use inside materialUI form Component
  const classes = useStyles();

  useEffect(() => {
    radioValue === 'yes' ? setSchedule(true) : setSchedule(false);
    new Date(startDate).getTime() > new Date(endDate).getTime()
      ? setError(true)
      : setError(false);
  }, [scheduleForRenewal, radioValue, startDate, endDate, error]);

  //radio button handler
  const handleChange = event => {
    setRadioValue(event.target.value);
  };

  //form submit handler
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: 'patch',
      url: `/contracts/${contractId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        periodStart: startDate,
        periodEnd: endDate,
        scheduleForRenewal: schedule,
        negotiationRenewalDate: renewalDate
      }
    })
      .then(response => {
        setLoading(false);
        updateContract();
        closeModal();

        return response.json;
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
            change={date => setStartDate(date)}
          />
          <br />
          <DatePicker
            labelValue="Contract End Date"
            dateValue={endDate}
            id="end"
            error={error}
            change={date => setEndDate(date)}
          />

          {error ? (
            <p style={{ fontSize: '11px', color: 'red' }}>
              Contract End Date can not be greater than start date
            </p>
          ) : null}

          <p>
            <label>Schedule for Renewal Contract?</label>
          </p>
          <RadioGroup
            aria-label="renewal"
            name="renewal"
            value={radioValue}
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
          {radioValue === 'yes' ? (
            <DatePicker
              labelValue="Renew Contract"
              dateValue={renewalDate}
              id="renewal"
              change={date => setRenewalDate(date)}
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
