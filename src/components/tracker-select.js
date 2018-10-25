import React from 'react';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'

export default function TrackerSelect(props) {
  return (
    <DropdownList 
      data={props.options}
      placeholder={'Select a workout to track progress'}
      onChange={value => props.onChange(value)}
    />
  )
}