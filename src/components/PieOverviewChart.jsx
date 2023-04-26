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

        setData({
            labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: portfolioValues,
                    backgroundColor: ["red", "blue", "yellow"],
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
            type: "pie",
            data,
            options,
        });

        return () => chart.destroy();
    }, [data, options]);

    return <canvas ref={canvasRef} />;
};

export default PieChart;
