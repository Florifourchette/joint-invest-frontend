import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(0, 0, 255)",
      tension: 0.1,
    },
  ],
};

const OverviewChart = ({ totalAssetsSum }) => {
    data.datasets[0].data.push(Number(totalAssetsSum));
    console.log(data)
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



export default OverviewChart;