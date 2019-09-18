import moment from 'moment';

export const CustomDateConverter = ({ date }) => {
  const newDate = moment(new Date(date)).format('DD MMM YYYY');
  return newDate;
};

export default CustomDateConverter;
