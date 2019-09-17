import React, { useEffect } from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../CustomButton/CustomButton';
import './Form.css';
import Moment from 'moment';
import axios from '../../axiosUrl';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  MuiFormLabelRoot: {
    color: 'red'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  multilineColor: {
    color: '#2ac8ba'
  },
  radio: {
    '&$checked': {
      color: 'rgb(0, 132, 132)'
    }
  },
  checked: {}
}));

const Form = ({ contractInfo, closeModal, click }) => {
  const {
    company,
    periodStart,
    periodEnd,
    negotiationRenewalDate,
    scheduleForRenewal,
    contractId
  } = contractInfo;

  //state of form component
  const [radioValue, setRadioValue] = React.useState('no');
  const contractStartDate = Moment(periodStart).calendar();
  const contractEndDate = Moment(periodEnd).calendar();
  const scheduleValue = scheduleForRenewal;

  const [startDate, setStartDate] = React.useState(contractStartDate);
  const [endDate, setEndDate] = React.useState(contractEndDate);
  const [schedule, setSchedule] = React.useState(scheduleValue);
  const [renewalDate, setRenewalDate] = React.useState(new Date());
  const [error, setError] = React.useState(false);

  //styles to use inside materialUI form Component
  const classes = useStyles();

  useEffect(() => {
    // scheduleForRenewal === true ? setRadioValue('no') : setRadioValue('yes');
    radioValue === 'yes' ? setSchedule(true) : setSchedule(false);
    new Date(startDate).getTime() > new Date(endDate).getTime()
      ? setError(true)
      : setError(false);
  }, [scheduleForRenewal, radioValue, startDate, endDate, error]);

  //for set value of radio button
  const handleChange = event => {
    setRadioValue(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: 'patch',
      url: `/${contractId}`,
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
        console.log(response.json);
        return response.json;
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="CompanyIcon">
        <i className="fa fa-industry" aria-hidden="true"></i>
      </div>
      <div className="name">{company}</div>
      <form onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="startDate"
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="start"
            label="Contract Start Date"
            value={startDate}
            onChange={date => setStartDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <br />
          <KeyboardDatePicker
            name="endDate"
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="end"
            error={error}
            label="Contract End Date"
            value={endDate}
            onChange={date => setEndDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <br />
        </MuiPickersUtilsProvider>
        <label>Schedule for Renewal Contract?</label>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="renewalDate"
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="start"
              label="Renew Contract"
              value={renewalDate}
              onChange={date => setRenewalDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        ) : null}

        <CustomButton btnType="submit" isDisabled={error}>
          Submit
        </CustomButton>
      </form>
    </div>
  );
};

export default Form;
