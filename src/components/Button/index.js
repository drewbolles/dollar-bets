import React from 'react';
import './Button.css';

export default function Button({ className, children, ...rest }) {
  const classes = className ? `button ${className}` : 'button';
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
