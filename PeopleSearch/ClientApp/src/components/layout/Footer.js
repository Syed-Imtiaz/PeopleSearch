import React from 'react';
import { Message } from 'semantic-ui-react';

export default () => {
  return (
    <Message
      info 
      style={{ marginTop: '20px', marginBottom: '20px' }}
      >
      Copyright &copy; {new Date().getFullYear()} Ingenious Works
    </Message>
  );
};
