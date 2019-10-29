import React from 'react';
import moment from 'moment';

interface Props {
  date: string;
}

export const CustomDateConverter: React.FC<Props> = props => {
  const { date } = props;

  const newDate = moment(new Date(date)).format('DD MMM YYYY');
  return <>{newDate}</>;
};

export default CustomDateConverter;
