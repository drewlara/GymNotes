import React from 'react';
import './spinner.css';

export default function Spinner(props){
  return (
    <div className="ring-wrapper">
      <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}