import logo from './logo.svg';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const options = {
  // responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
  "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25",
  "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38",
  "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
  "52", "53", "54", "55", "56", "57", "58", "59", "60",
]




const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(0,100,0,0.1)",
      borderColor: "green"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};


function App() {
  return (
    <div className="App">

      <Line options={options} data={{
        labels,
        datasets: [
          {
            label: 'CPU Usage',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
            backgroundColor: 'rgba(0, 200, 0, 0.5)',
            tension: 0.4,
            fill: true,
            borderColor: 'green',
            pointBackgroundColor: "green"
            // borderWidth: 1
          }
        ],
      }} />time




    </div>
  );
}

export default App;
