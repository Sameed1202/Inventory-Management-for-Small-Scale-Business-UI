import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const CreateCharts = ({
  xtitle,
  ytitle,
  charttitle,
  xseriesname,
  seriesdata,
  categoriesdata,
  graphtype
}) => {
  const [xaxisName, setXaxisName] = useState("");
  const [yaxisName, setYaxisName] = useState("");
  const [chartTitle, setChartTitle] = useState("");
  const [xSeriesName, setXSeriesName] = useState("");
  const [seriesData, setSeriesData] = useState([]);
  const [categoriesData, setcategoriesData] = useState([]);
  const [graphType, setGraphType] = useState("line");
  // [30, 40, 45, 50, 49, 60, 70, 91]
  useEffect(() => {
    setXaxisName(xtitle);
    setYaxisName(ytitle);
    setChartTitle(charttitle);
    setXSeriesName(xseriesname);
    setSeriesData(seriesdata);
    setcategoriesData(categoriesdata);
    setGraphType(graphtype);
  }, [xtitle, ytitle, charttitle, xseriesname, seriesdata, categoriesdata, graphtype]);

  const options = {
    title: { text: chartTitle },
    chart: {
      id: "basic-bar",
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
    },
    colors: ['#77B6EA', '#545454'],
    xaxis: {
      categories: categoriesData,
      title: { text: xaxisName },
    },
    yaxis: {
      title: { text: yaxisName },
    },
  };

  const series = [
    {
      name: xSeriesName,
      data: seriesData,
    },
    // {
    //   name: "Sales loss",
    //   data: [49, 60, 70, 91, 30, 40, 45, 50],
    // },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type={graphType} width="550" />
        </div>
      </div>
    </div>
  );
};
