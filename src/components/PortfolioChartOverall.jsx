import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const PortfolioChartOverall = ({ orderBook }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: ["red", "yellow"],
      },
    ],
  });

  useEffect(() => {
    let inputData = [];
    let colorData = [];
    let labelData = [];

    orderBook.map((item) => {
      const datetimeDisplay = item.creating_date;
      const dateDisplay = datetimeDisplay.slice(0, 10);

      if (item.type_of_transaction == "Buy") {
        inputData.push(item.buy_sell_value);
        colorData.push("#CBB330");
        labelData.push(`Buy: ${item.company_id}(${item.number_of_shares})`);
      } else {
        inputData.push(`-${item.buy_sell_value}`);
        colorData.push("#864040");
        labelData.push(`Sell: ${item.company_id}(${item.number_of_shares})`);
      }
    });

    console.log("barchart data", inputData);
    console.log("barchart colors", colorData);

    setData({
      labels: labelData,
      datasets: [
        {
          label: "Transactions",
          data: inputData,
          backgroundColor: colorData,
          borderColor: "#FFFF",
        },
      ],
    });
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const chart = new Chart(canvas, {
      type: "bar",
      data,
      options,
    });

    return () => chart.destroy();
  }, [data, options]);

  return <canvas ref={canvasRef} style={{ height: "300px" }} />;
};

export default PortfolioChartOverall;
