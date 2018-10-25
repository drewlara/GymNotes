import React from 'react';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment'
import Moment from 'moment';
import 'react-widgets/dist/css/react-widgets.css'

export default function DatePicker(props){
  Moment.locale('en');
  momentLocalizer();
  return (
    <DateTimePicker 
      onChange={props.input.onChange}
      dropUp
      //format="MM-DD-YYYY HH:mm:ss A"
      value={!props.input.value ? null : new Date(props.input.value)}
      time={false}
      parse={str => new Date(str)}
    />
  )
}