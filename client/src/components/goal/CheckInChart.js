import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'react-moment';
import { startSession } from 'mongoose';

class CheckInChart extends Component {
  state = {
    options: {
      responsive: true,
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }
  render() {
    const { checkins, goal } = this.props;
    const checkInDates = checkins.map(checkin => checkin.date);
    let datasets;
    let weightData, repsData;
    let minutesData, secondsData;
    let habitData;
    let weight, reps, minutes, seconds, days;

    if (goal.category === 'Strength') {
      weight = checkins.map(checkin => checkin.weight);
      reps = checkins.map(checkin => checkin.reps);
      weightData = {
        label: 'Weight',
        data: weight,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y-axis-1'
      }
      repsData = {
        label: 'Reps',
        data: reps,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        type: 'line',
        yAxisID: 'y-axis-2'
      }
      datasets = [weightData, repsData];
    } else if (goal.category === 'Conditioning') {
      minutes = checkins.map(checkin => checkin.minutes);
      seconds = checkins.map(checkin => checkin.seconds);
      minutesData = {
        label: 'Minutes',
        data: minutes,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y-axis-1'
      }
      secondsData = {
        label: 'Seconds',
        data: seconds,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        type: 'line',
        yAxisID: 'y-axis-2'
      }
      datasets = [minutesData, secondsData];
    } else if (goal.category === 'Habit') {
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      days = range(1, checkins.length, 1);
      habitData = {
        label: 'Days',
        data: days,
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
      datasets = [habitData];
    }

    const chartData = {
      labels: checkInDates,
      datasets
    };

    return (
      <div>
        <h4 className="mb-4">Check In Entries</h4>
        <Bar 
          data={chartData}
          options={this.state.options}
        />
      </div>
    )
  }
}

export default CheckInChart;