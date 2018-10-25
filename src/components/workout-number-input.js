import React from 'react';

export default class NumberInput extends React.Component {
  render() {
    const { input: { value, onChange }, min, max, increment } = this.props;
    
    let error;
      if (this.props.meta.touched && this.props.meta.error) {
          error = <div className="form-error">{this.props.meta.error} <i className="fas fa-exclamation-circle"></i></div>;
      }

      let warning;
      if (this.props.meta.touched && this.props.meta.warning) {
          warning = (
              <div className="form-warning">{this.props.meta.warning} <i className="fas fa-exclamation-circle"></i></div>
          );
      }

    return (
      <div className="wrapper">
        <div className='workout-number-input'>
          <button className="number-button decrease" name="decreaseValue" type="button" onClick={() => parseInt(value, 10) >= min ? onChange(parseInt(value, 10) - increment) : null}>-</button>
          <input 
            type="number"
            onChange={onChange}
            value={value}
          />
          <button className="number-button increase" name="increaseValue" type="button" onClick={() => parseInt(value, 10) <= max ? onChange(parseInt(value, 10) + increment) : null}>+</button>
        </div>
        {error}
        {warning}
      </div>
    )
  }
}