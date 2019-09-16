import React from 'react';
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
import axios from 'axios';

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

const Form = ({ contractInfo }) => {
  const [radioValue, setRadioValue] = React.useState('no');
  const {
    company,
    periodStart,
    periodEnd,
    negotiationRenewalDate,
    contractId
  } = contractInfo;

  const contractStartDate = Moment(periodStart).calendar();
  const contractEndDate = Moment(periodEnd).calendar();

  const [startDate, setStartDate] = React.useState(contractStartDate);
  const [endDate, setEndDate] = React.useState(contractEndDate);
  const [renewalDate, setRenewalDate] = React.useState(new Date());
  //styles to use inside materialUI form Component
  const classes = useStyles();

  //for set value of radio button
  const handleChange = event => {
    setRadioValue(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: 'patch',
      url: `https://cors-anywhere.herokuapp.com/https://europe-west1-contracts-app-cb26b.cloudfunctions.net/contracts/${contractId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        crossdomain: true
      },

      mode: 'no-cors',
      proxy: {
        host: '127.0.0.1',
        port: 9000
      },
      data: {
        periodStart: contractStartDate,
        periodEnd: contractEndDate
      }
    })
      .then(response => {
        console.log(response.json);
        return response.json;
      })
      .catch(error => console.log(error));
  };
  // console.log(selectedDate);

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

        <CustomButton btnType="submit">Submit</CustomButton>
      </form>
    </div>
  );
};

export default Form;
