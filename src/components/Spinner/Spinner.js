import React from 'react';
import './Spinner.css';

const Spinner = ({ isLoading }) => {
  let spinner = null;
  if (isLoading) {
    spinner = (
      <div className="SpinnerOverlay">
        <div className="SpinnerContainer"></div>
      </div>
    );
  }

  return spinner;
};

export default Spinner;
