import React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import TrackerSelect from './tracker-select';
import moment from 'moment';
import { seriesAvg } from '../average';

export class TrackerChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weightSeries: [],
      repsSeries: [],
      title: '',
      max: 150,
      dataLabelsOn: true,
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  }

  toCurrent(name) {
    let currentWeightSeries = [];
    let currentRepSeries = [];
    let findMax = [];

    let currentWeek = this.props.workouts.filter(workout => {
      return moment(workout.date).valueOf() >= moment().startOf('isoWeek').valueOf() && moment(workout.date).valueOf() <= moment().endOf('isoWeek').valueOf() && workout.name === name;
    })

    currentWeek.forEach(workout => {
      currentWeightSeries.push([moment(workout.date).valueOf(), workout.weight]);
      currentRepSeries.push([moment(workout.date).valueOf(), workout.reps]);
      findMax.push(workout.weight, workout.reps);
    })

    let max = Math.max(...findMax) + 30;   
  
    this.setState({
      weightSeries: [...seriesAvg(currentWeightSeries, 'ddd').seriesAvgArr],
      repsSeries: [...seriesAvg(currentRepSeries, 'ddd').seriesAvgArr],
      title: name,
      max,
      dataLabelsOn: true,
      categories: [...seriesAvg(currentWeightSeries, 'ddd').dateLabels]
    });
  }

  toLastSeven() {
    let currentWeightSeries = [];
    let currentRepSeries = [];
    let findMax = [];

    let lastSeven = this.props.workouts.filter(workout => {
      return workout.name === this.state.title && moment(workout.date).valueOf() >= moment().subtract(7, 'days').valueOf() && moment(workout.date).valueOf() <= moment().valueOf()
    });

    lastSeven.forEach(workout => {
      currentWeightSeries.push([moment(workout.date).valueOf(), workout.weight]);
      currentRepSeries.push([moment(workout.date).valueOf(), workout.reps]);
      findMax.push(workout.weight, workout.reps);
    });

    let max = Math.max(...findMax) + 30;  

    this.setState({
      weightSeries: [...seriesAvg(currentWeightSeries, 'MMM/DD').seriesAvgArr],
      repsSeries: [...seriesAvg(currentRepSeries, 'MMM/DD').seriesAvgArr],
      max,
      dataLabelsOn: true,
      categories: [...seriesAvg(currentWeightSeries, 'MMM/DD').dateLabels]
    });

  }

  toLastThirty() {
    let currentWeightSeries = [];
    let currentRepSeries = [];
    let findMax = [];

    let lastThirty = this.props.workouts.filter(workout => {
      return workout.name === this.state.title && moment(workout.date).valueOf() >= moment().subtract(30, 'days').valueOf() && moment(workout.date).valueOf() <= moment().valueOf()
    });

    lastThirty.forEach(workout => {
      currentWeightSeries.push([moment(workout.date).valueOf(), workout.weight]);
      currentRepSeries.push([moment(workout.date).valueOf(), workout.reps]);
      findMax.push(workout.weight, workout.reps);
    });

    let max = Math.max(...findMax) + 30;  

    let weightSeriesAvg = [...seriesAvg(currentWeightSeries, 'MMM/DD').seriesAvgArr];
    let repSeriesAvg = [...seriesAvg(currentRepSeries, 'MMM/DD').seriesAvgArr];
    let dateLabels = [...seriesAvg(currentWeightSeries, 'MMM/DD').dateLabels];

    let displayedWeightData = [];
    let displayedRepData = [];
    let displayedDateLabels = [];

    for(let i = 0; i < dateLabels.length - 3; i += 3){
      displayedWeightData.push(weightSeriesAvg.splice(i, 1)[0]);
      displayedRepData.push(repSeriesAvg.splice(i, 1)[0]);
      displayedDateLabels.push(dateLabels.splice(i, 1)[0]);
    }

    displayedWeightData.push(weightSeriesAvg[weightSeriesAvg.length - 1]);
    displayedRepData.push(repSeriesAvg[repSeriesAvg.length - 1]);
    displayedDateLabels.push(dateLabels[dateLabels.length - 1]);

    this.setState({
      weightSeries: [...displayedWeightData],
      repsSeries: [...displayedRepData],
      max,
      dataLabelsOn: false,
      categories: [...displayedDateLabels]
    });
  }

  render() {
    let options = {
      chart: {
          defaultLocale: 'en',
          type: 'line',
          shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
          },
          zoom: {
              enabled: false
          },
          toolbar: {
            show: false
          }
      },
      colors: ['#545454', '#55B4E0'],
      dataLabels: {
          enabled: this.state.dataLabelsOn,
      },
      stroke: {
          curve: 'smooth'
      },
      title: {
          text: this.state.title,
          align: 'center'
      },
      grid: {
          borderColor: '#e7e7e7',
          row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
          },
      },
      markers: {
          style: 'inverted',
          size: 6
      },
      xaxis: {
        categories: this.state.categories
      },
      yaxis: {
          title: {
              text: 'Average Weight/Reps'
          },
          min: 0,
          max: this.state.max
      },
      legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
      }
    }
  
    let series = [
      {
        name: "Weight",
        data: this.state.weightSeries
      },
      {
        name: "Reps",
        data: this.state.repsSeries
      }
    ]

    let workoutNames = [];
    this.props.workouts.forEach(workout => workoutNames.includes(workout.name) ? null : workoutNames.push(workout.name));

    let lastThirty = this.props.workouts.filter(workout => {
      return workout.name === this.state.title && moment(workout.date).valueOf() >= moment().subtract(30, 'days').valueOf() && moment(workout.date).valueOf() <= moment().valueOf()
    });

    let lastThirtyButton = lastThirty.length >= 9 ? <button className="filter-button" onClick={() => this.toLastThirty()}>View Last 30 Days</button> : null;
    let lastSevenButton = this.state.title !== '' ? <button className="filter-button" onClick={() => this.toLastSeven()}>View Last 7 Days</button> : null;
    let toCurrentButton = this.state.title !== '' ? <button className="filter-button" onClick={() => this.toCurrent(this.state.title)}>View Current Week</button> : null;

    return (
      <div className="tracker-chart-wrapper">
        <div className="tracker-chart">
          <div className="tracker-select">
            <TrackerSelect options={workoutNames.sort()} onChange={name => this.toCurrent(name)} />
          </div>
          <Chart 
            options={options}
            series={series}
            type="line"
            width="375"
            height="400"
          />
          <div className="filters">
            {toCurrentButton}
            {lastSevenButton}
            {lastThirtyButton}
          </div>
        </div>
        <div className="tracker-chart-resp">
          <div className="tracker-select">
            <TrackerSelect options={workoutNames.sort()} onChange={name => this.toCurrent(name)} />
          </div>
          <Chart 
            options={options}
            series={series}
            type="line"
            width="725"
            height="500"
          />
          <div className="filters">
            {toCurrentButton}
            {lastSevenButton}
            {lastThirtyButton}
          </div>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
    workouts: state.app.workouts
});

export default connect(mapStateToProps)(TrackerChart);