import React from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    id: "apexchart-example",
  },
  title: {
    text: "Doughnut Chart Title",
    align: "centre",
    margin: 20,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#263238",
    },
  },
};
const series = [44, 55, 41, 17, 15];
const labels = ["A", "B", "C", "D", "E"];

const DoughnutChart = () => {
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      // width={500}
      // height={320}
    />
  );
};

export default DoughnutChart;
