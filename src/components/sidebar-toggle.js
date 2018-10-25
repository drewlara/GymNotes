import React from 'react';
import './sidebar-toggle.css';

export default function SidebarToggle(props) {
  return (
    <button className="toggle-button" onClick={props.toggle}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
    </button>
  )
}