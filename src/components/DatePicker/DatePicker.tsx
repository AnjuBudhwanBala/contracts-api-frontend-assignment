import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Moment } from 'moment';

interface Props {
  dateValue: Moment;
  labelValue: string;
  change: (date: any) => void;
  id: string;
  error?: boolean;
}

const DatePicker: React.FC<Props> = ({
  dateValue,
  labelValue,
  change,
  id,
  error
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id={id}
        label={labelValue}
        value={dateValue}
        onChange={change}
        error={error}
        autoOk={true}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
