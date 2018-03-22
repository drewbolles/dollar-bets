import React from 'react';
import './Container.css';

export default function Container({ children }) {
  return <div className="layout-container">{children}</div>;
}
