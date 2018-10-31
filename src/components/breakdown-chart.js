import React from 'react';
import { connect } from 'react-redux'
import Chart from 'react-apexcharts';
import moment from 'moment';

export class BreakdownChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      workoutTypes: [],
      workoutLabels: []
    }
    this.toCurrent = this.toCurrent.bind(this);
  }

  toCurrent(){
    let currentWeek = this.props.workouts.filter(workout => {
      return moment(workout.date).valueOf() >= moment().startOf('isoWeek').valueOf() && moment(workout.date).valueOf() <= moment().endOf('isoWeek').valueOf()
    });

    let workoutTypes = {};
    currentWeek.forEach(workout => {
      if (!workoutTypes[workout.type]){
        workoutTypes[workout.type] = 1
      } else {
        workoutTypes[workout.type] += 1
      }
    });

    let types = [];
    let labels = [];


    Object.keys(workoutTypes).sort().forEach(key => {
      labels.push(key);
      types.push(workoutTypes[key]);
    });

    this.setState({
      title: 'Current Week',
      workoutTypes: [...types],
      workoutLabels: [...labels]
    })
  }

  toLastSeven(){
    let lastSeven = this.props.workouts.filter(workout => {
      return moment(workout.date).valueOf() >= moment().subtract(7, 'days').valueOf() && moment(workout.date).valueOf() <= moment().valueOf();
    });

    let workoutTypes = {};
    lastSeven.forEach(workout => {
      if (!workoutTypes[workout.type]){
        workoutTypes[workout.type] = 1
      } else {
        workoutTypes[workout.type] += 1
      }
    });

    let types = [];
    let labels = [];


    Object.keys(workoutTypes).sort().forEach(key => {
      labels.push(key);
      types.push(workoutTypes[key]);
    });

    this.setState({
      title: 'Last 7 Days',
      workoutTypes: [...types],
      workoutLabels: [...labels]
    })

  }

  toLastThirty(){
    let lastThirty = this.props.workouts.filter(workout => {
      return moment(workout.date).valueOf() >= moment().subtract(30, 'days').valueOf() && moment(workout.date).valueOf() <= moment().valueOf()
    });

    let workoutTypes = {};
    lastThirty.forEach(workout => {
      if (!workoutTypes[workout.type]){
        workoutTypes[workout.type] = 1
      } else {
        workoutTypes[workout.type] += 1
      }
    });

    let types = [];
    let labels = [];


    Object.keys(workoutTypes).sort().forEach(key => {
      labels.push(key);
      types.push(workoutTypes[key]);
    });

    this.setState({
      title: 'Last 30 Days',
      workoutTypes: [...types],
      workoutLabels: [...labels]
    })
  }

  componentWillMount(){
    this.toCurrent();
  }

  componentDidUpdate(prevProps){
    if(prevProps.workouts !== this.props.workouts){
      this.toCurrent();
    }
  }


  render() {
    let chartData = {
      options: {
        height: '100%',
        labels: this.state.workoutLabels,
        title: {
          text: this.state.title,
            align: 'center',
            margin: 20,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              color:  'rgb(51, 51, 51)'
            }
        },
        legend: {
          position: 'bottom',
          containerMargin: {
            top: 5
          }
        },
        chart: {
          background: '#fff'
        }
      },
      series: this.state.workoutTypes
    }

    let breakdownOptions = <div className="breakdown-options"><span onClick={() => this.toCurrent()}>Current Week</span> <span onClick={() => this.toLastSeven()}>Last 7 Days</span> <span onClick={() => this.toLastThirty()}>Last 30 Days</span></div>;
    
    return (
      <div className="chart-wrapper">
        <Chart
        options={chartData.options}
        series={chartData.series}
        labels={chartData.labels}
        type="donut"
        width="300"
      />
      {breakdownOptions}
      </div>
    )
    }
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
});

export default connect(mapStateToProps)(BreakdownChart);