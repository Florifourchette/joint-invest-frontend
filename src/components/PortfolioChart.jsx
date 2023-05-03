import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const PortfolioChart = ({ intervalSum }) => {
  

  const closeValues = intervalSum.map(obj => obj.close);
  console.log('close values',closeValues)
  const datetimeDisplay =intervalSum.map(obj =>obj.datetime);
  const hourDisplay = datetimeDisplay.map(datetime => datetime.slice(10, 16));

  const labels = hourDisplay;


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total value in the past hours",
        data: closeValues,
        fill: true,
        borderColor: "rgb(0, 0, 255)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <Line
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PortfolioChart;
