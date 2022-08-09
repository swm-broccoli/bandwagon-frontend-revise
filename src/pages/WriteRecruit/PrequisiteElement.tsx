import React from 'react';

function SessionPrequisiteElement () {
  return (
    <div>
      세션
    </div>
  );
};

function AgePrequisiteElement () {
  return (
    <div>
      나이
    </div>
  );
};

function GenderPrequisiteElement () {
  return (
    <div>
      성별
    </div>
  );
};

function AreaPrequisiteElement () {
  return (
    <div>
      지역
    </div>
  );
};

function GenrePrequisiteElement () {
  return (
    <div>
      장르
    </div>
  );
};

function PrequisiteElement (props: {type: string}) {
  switch (props.type) {
    case '세션':
      return <SessionPrequisiteElement />;
    case '나이':
      return <AgePrequisiteElement />;
    case '성별':
      return <GenderPrequisiteElement />;
    case '지역':
      return <AreaPrequisiteElement />;
    case '장르':
      return <GenrePrequisiteElement />;
    default:
      return (
        <></>
      )
  };
};

export default PrequisiteElement