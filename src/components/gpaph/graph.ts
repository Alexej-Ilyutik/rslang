// eslint-disable-next-line import/extensions
import Chart from '../../assets/chart.min.js';
import './graph.scss';

export const renderGraph = (dateArray: string[], dataArray: number[], description: string, element: HTMLCanvasElement) => {
  const ctx = element.getContext('2d');
  element.style.background = '#fbedd2'
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      // labels: ['02/09/2022', '03/09/2022', '04/09/2022', '05/09/2022', '06/09/2022', '07/09/2022', '08/09/2022', '09/09/2022'],
      labels: dateArray,
      datasets: [{
        // label: 'new words per day',
        label: description,
        // data: [12, 19, 3, 5, 2, 3, 5, 6],
        data: dataArray,
        backgroundColor: [
          '#ffc107',
        ],
        pointStyle: 'rectRounded',
        radius: 6,
        borderColor: [
          '#313437',
        ],
        borderWidth: 2,
        tension: 0.2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true
    }
  });
}