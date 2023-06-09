import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ dashboardData, portfolioTotals }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  });

  useEffect(() => {
    const portfolioValues = Object.values(portfolioTotals).map(parseFloat);
    const labels = dashboardData.reduce((acc, curr) => {
      if (!acc.includes(curr.name_of_portfolio)) {
        acc.push(curr.name_of_portfolio);
      }
      return acc;
    }, []);

    const generateColors = (count) => {
      const baseHue = 35;
      const saturation = 100;
      const lightness = 30;
      const colors = [];

      for (let i = 0; i < count; i++) {
        const hue = baseHue + i * 10;
        const color = `hsl(${hue}, ${saturation}%, ${lightness + i * 10}%)`;
        colors.push(color);
      }

      return colors;
    };

    const backgroundColors = generateColors(portfolioValues.length);
    setData({
      labels,
      datasets: [
        {
          label: "# portfolios",
          data: portfolioValues,
          backgroundColor: backgroundColors,
          borderColor: "#FFFF",
        },
      ],
    });
  }, [dashboardData, portfolioTotals]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const chart = new Chart(canvas, {
      type: "doughnut",
      data,
      options,
    });

    return () => chart.destroy();
  }, [data, options]);

  return <canvas ref={canvasRef} />;
};

export default PieChart;
