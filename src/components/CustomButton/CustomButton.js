import React from 'react';
import './CustomButton.css';

const CustomButton = ({ click, children, btnType, isDisabled }) => {
  return (
    <div className="CustomButton">
      <button type={btnType} onClick={click} disabled={isDisabled}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
