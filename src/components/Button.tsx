import React from 'react';

function Button (props: {
  label: string,
  x: string,
  y: string,
  textSize: string,
}) {
  const buttonStyle = 'btn btn-primary ' + props.x + props.y + 'rounded-lg text-white font-normal ' + props.textSize;

  return (
    <button className={buttonStyle}>
      {props.label}
    </button>
  );
};

export default Button;