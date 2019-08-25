import React from 'react';

const NavigationPage = () => {
  const onClick = () => {};
  return (
    <div className='container'>
      <div className='card card-nh set-color-white'>
        <h1>Start</h1>
        <div
          className='card card-md'
          style={{
            textAlign: 'center',
            width: '15rem',
            marginLeft: '22.5rem'
          }}
          onClick={onClick}
        >
          Build a new house
        </div>
      </div>
      <div className='card card-nh set-color-white'>
        <h1>Continue</h1>
      </div>
    </div>
  );
};

export default NavigationPage;
