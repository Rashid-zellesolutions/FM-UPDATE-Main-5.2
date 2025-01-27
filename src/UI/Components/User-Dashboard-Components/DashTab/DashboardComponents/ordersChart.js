import React from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const [chartOptions, setChartOptions] = React.useState({
    series: [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "#fff",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10, // Adjust radius of the bars
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: ["#4487C5", "#76A7D4"], // Colors for the bars
      states: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.2,
          },
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0", // Color of the grid lines
        strokeDashArray: 4, // Dash array for dotted lines
        position: "back",
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
    },
  });

  return (
    <div className="bar_chart_order_stats">
      <h3>Order Statistics</h3>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        height={430}
      />
    </div>
  );
};

export default BarChart;
