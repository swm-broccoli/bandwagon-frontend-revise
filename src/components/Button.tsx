import React from 'react';

function Button (props: {
  label: string,
  x: string,
  y: string,
  textSize: string,
}) {
  const divStyle = 'flex ' + props.x + props.y + 'bg-primary rounded-lg justify-center items-center text-white ' + props.textSize;

  return (
    <button className={divStyle}>
      {props.label}
    </button>
  );
};

export default Button;