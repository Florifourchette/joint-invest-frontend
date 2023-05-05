import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const PortfolioChart = ({ intervalSum }) => {
  const closeValues = intervalSum.map((obj) => obj.close);
  console.log("close values", closeValues);
  const datetimeDisplay = intervalSum.map((obj) => obj.datetime);
  const hourDisplay = datetimeDisplay.map((datetime) => datetime.slice(10, 16));

  const labels = hourDisplay;
  Chart.defaults.font.size = 14;
  Chart.defaults.font.family = "sans-serif";
  Chart.defaults.font.weight = "600";
  Chart.defaults.color = "#31231E";

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total value in the past hours",
        data: closeValues,
        fill: true,
        borderColor: "#5A3A31",
        tension: 0.1,
        backgroundColor: "rgba(203, 179, 48, 0.5)",
        borderWidth: 4,
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <Line
          style={{ height: "300px" }}
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: "10px",
            },
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
