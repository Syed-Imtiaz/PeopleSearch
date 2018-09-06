import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <img
        src={spinner}
        style={{ width: '200px', height: '200px', margin: 'auto', marginTop: '150px', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
