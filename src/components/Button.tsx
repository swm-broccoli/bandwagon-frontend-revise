import React from 'react';

function Button (props: {
  label: string,
  x: string,
  y: string,
  textSize: string,
}) {
  const divStyle = 'flex ' + props.x + props.y + 'bg-primary border border-solid border-primary rounded-lg justify-center items-center';
  const pStyle = 'text-white ' + props.textSize;

  return (
    <div className={divStyle}>
      <p className={pStyle}>{props.label}</p>
    </div>
  );
};

export default Button;