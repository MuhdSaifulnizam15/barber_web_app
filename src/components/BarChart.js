import React from "react";
import Chart from "react-apexcharts";
import { faker } from "@faker-js/faker";

const options = {
  chart: {
    id: "apexchart-example",
  },
  title: {
    text: 'Bar Chart Title',
    align: 'centre',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize:  '14px',
      fontWeight:  'bold',
      color:  '#263238'
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};

const series = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
];

const BarChart = () => {
  return (
    <Chart
      options={options}
      series={series}
      title="Bar Chart Title"
      type="bar"
      // width={500}
      // height={320}
    />
  );
};

export default BarChart;
