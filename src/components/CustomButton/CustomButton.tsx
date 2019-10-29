import React from 'react';
import './CustomButton.css';

interface Props {
  click?: () => void;
  children: React.ReactNode;
  btnType: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
}

const CustomButton: React.FC<Props> = props => {
  const { click, children, btnType, isDisabled } = props;
  return (
    <div className="CustomButton">
      <button type={btnType} onClick={click} disabled={isDisabled}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
