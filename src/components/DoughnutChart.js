import React from "react";
import Chart from "react-apexcharts";

const options = {};
const series = [44, 55, 41, 17, 15];
const labels = ["A", "B", "C", "D", "E"];

const DoughnutChart = () => {
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={500}
      height={320}
    />
  );
};

export default DoughnutChart;
