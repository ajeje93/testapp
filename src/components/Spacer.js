import React from 'react';

export default ({ children, ...rest }) => (
  <div style={{ ...rest, border: '1px solid red' }}>{children}</div>
);
