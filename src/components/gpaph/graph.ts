import Chart from 'chart.js/auto';
import './graph.scss';

export const renderGraph = (dateArray: string[], dataArray: number[], description: string, element: HTMLCanvasElement) => {
  const ctx = element.getContext('2d') as CanvasRenderingContext2D ;
  element.style.background = '#fbedd2'
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateArray,
      datasets: [{
        label: description,
        data: dataArray,
        backgroundColor: [
          '#ffc107',
        ],
        pointStyle: 'rectRounded',
        pointRadius: 6,
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
