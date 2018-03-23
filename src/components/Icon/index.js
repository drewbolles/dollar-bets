import React from 'react';
import './Icon.css';

export default function Icon({ className, icon }) {
  const classes = className ? `material-icons ${className}` : 'material-icons';
  return <i className={classes}>{icon}</i>;
}
