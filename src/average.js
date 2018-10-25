import moment from 'moment';

export function seriesAvg(series, format) {
  let workouts = {};
  series.forEach(item => {
    if (!workouts[moment(item[0]).format('MM-DD-YYYY')]){
      workouts[moment(item[0]).format('MM-DD-YYYY')] = [parseInt(item[1], 10)]
    }
    else {
      workouts[moment(item[0]).format('MM-DD-YYYY')].push(parseInt(item[1], 10))
    }
  });

  const workoutDates = Object.keys(workouts).sort((a,b) => moment(a, 'MM-DD-YYYY HH:mm:ss A') - moment(b, 'MM-DD-YYYY HH:mm:ss A'));
  let seriesAvgArr = [];
  let dateLabels = [];

  workoutDates.forEach(key => {
    let avg = workouts[key].reduce((a,b) => a+b) / (workouts[key].length)
    seriesAvgArr.push(avg)
    dateLabels.push(moment(key, 'MM-DD-YYYY HH:mm:ss A').format(format).toString())
  });

  return {seriesAvgArr, dateLabels};
}