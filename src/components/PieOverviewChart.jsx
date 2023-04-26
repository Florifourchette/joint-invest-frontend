import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = {
    labels: [], // array of strngs to get labels

    datasets: [
        {
            label: "# of Votes",
            data: [], //get the data from the portfolio assets
            backgroundColor: ["red", "blue", "yellow"], //figure out the how to get colors to match the labels
        },
    ],
};
console.log(`name labels ${data.labels}`);
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

const PieChart = ({ dashboardData, portfolioTotals }) => {

    //filling labes for pie chart
    for (let i = 0; i < dashboardData.length; i++) {
        const label = dashboardData[i].name_of_portfolio;
        if (!data.labels.includes(label)) {
            data.labels.push(label);
        }
    }
    const canvasRef = useRef(null);
    //values for pie chart
    const portfolioValues = Object.values(portfolioTotals);
    for (let i = 0; i < portfolioValues.length; i++) {
        portfolioValues[i] = parseFloat(portfolioValues[i]);
    }
    data.datasets[0].data = portfolioValues;
    console.log(portfolioValues) 
    

    useEffect(() => {
        const canvas = canvasRef.current;
        const chart = new Chart(canvas, {
            type: "pie",
            data: data,
            options: options,
        });

        return () => chart.destroy();
    }, [data, options]);

    return <canvas ref={canvasRef} />;
};

export default PieChart;
