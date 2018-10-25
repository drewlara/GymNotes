import React from 'react';
import './backdrop.css';

export default function Backdrop(props) {
  return (<div onClick={props.show} className="backdrop"></div>)
}