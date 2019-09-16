import React from 'react';
import './CustomButton.css';

const CustomButton = ({ click, children, disabled, btnType }) => {
  return (
    <div className="CustomButton">
      <button type={btnType} onClick={click} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
