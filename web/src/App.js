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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);




function App() {



  const baseUrl = ""
  // const baseUrl = "https://inzi.herokuapp.com"
  // const baseUrl = "http://localhost:4000"


  const [isLoading, setIsLoading] = useState(false);

  const [readings, setReadings] = useState([]);
  const [ramReadings, setRamReadings] = useState([]);

  const [totalResource, setTotalResource] = useState({
    ram: 0,
    cpu: 0
  })

  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25",
    "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38",
    "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
    "52", "53", "54", "55", "56", "57", "58", "59", "60",
  ]




  useEffect(() => {

    const socket = io(baseUrl);

    socket.on('connect', function () {
      console.log("connected")
    });


    // to subcribe to a topic
    socket.on('USAGE', function (data) {
      // console.log("cpu usage: ", data.data[0]);
      // console.log(data);

      setReadings(prev => [data.data[0], ...prev,])
      setRamReadings(prev => [data.data[2].usedMemPercentage, ...prev,])
      setTotalResource(prev => ({ ...prev, ram: data.data[2].totalMemMb }))
    });

    socket.on('disconnect', function (message) {
      console.log("Socket disconnected from server: ", message);
    });

    return () => {
      socket.close();
    }

  }, [])




  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexDirection: 'column', width: "60%" }}>

      <Line options={{
        // responsive: true,
        animation: {
          duration: 0 // general animation time
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'CPU Usage',
          }
        },
      }} data={{
        labels,
        datasets: [
          {
            label: 'CPU Usage in %',
            data: readings,
            backgroundColor: 'rgba(0, 200, 0, 0.5)',
            tension: 0.4,
            fill: true,
            borderColor: 'green',
            pointBackgroundColor: "green",
            // borderWidth: 1,
          }
        ]
      }} />time



      <Line options={{
        // responsive: true,
        animation: {
          duration: 0 // general animation time
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: `Total Ram Memory: ${totalResource.ram} MB`,
          }
        },
      }} data={{
        labels,
        datasets: [
          {
            label: 'Ram Memory usage in %',
            data: ramReadings,
            backgroundColor: 'rgb(255,178,193)',
            tension: 0.4,
            fill: true,
            borderColor: 'green',
            pointBackgroundColor: "green",
            // borderWidth: 1,
          }
        ]
      }} />


      <button onClick={() => {

        setIsLoading(true)
        axios.post(`${baseUrl}/putload`, {}).then(response => {
          setIsLoading(false)
        })

      }}>Put Load</button>

      <p>{(isLoading) ? "putting load in progress..." : ""}</p>

    </div>
  );
}

export default App;
