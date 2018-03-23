import React from 'react';
import './Button.css';

function buildClasses(className, alt) {
  let classes = 'button';
  if (className) {
    classes += ` ${className}`;
  }
  if (alt) {
    classes += ' button--alt';
  }
  return classes;
}

export default function Button({ className, children, alt, ...rest }) {
  return (
    <button className={buildClasses(className, alt)} {...rest}>
      {children}
    </button>
  );
}
