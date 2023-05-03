import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const CreatePredictionCharts = ({
  xtitle,
  ytitle,
  charttitle,
  xseriesname,
  seriesdata,
  xseriesname2,
  seriesdata2,
  categoriesdata,
  graphtype,
}) => {
  const [xaxisName, setXaxisName] = useState("");
  const [yaxisName, setYaxisName] = useState("");
  const [chartTitle, setChartTitle] = useState("");
  const [xSeriesName, setXSeriesName] = useState("");
  const [xSeriesName2, setXSeriesName2] = useState("");
  const [seriesData, setSeriesData] = useState([]);
  const [seriesData2, setSeriesData2] = useState([]);
  const [categoriesData, setcategoriesData] = useState([]);
  const [graphType, setGraphType] = useState("line");
  // [30, 40, 45, 50, 49, 60, 70, 91]
  useEffect(() => {
    setXaxisName(xtitle);
    setYaxisName(ytitle);
    setChartTitle(charttitle);
    setXSeriesName(xseriesname);
    setXSeriesName2(xseriesname2);
    setSeriesData(seriesdata);
    setSeriesData2(seriesdata2);
    setcategoriesData(categoriesdata);
    setGraphType(graphtype);
  }, [
    xtitle,
    ytitle,
    charttitle,
    xseriesname,
    seriesdata,
    xseriesname2,
    seriesdata2,
    categoriesdata,
    graphtype,
  ]);

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
    stroke: {
      width: [5, 7],
      curve: 'straight',
      dashArray: [0, 0]
    },
    colors: ['#77B6EA', '#68B984'],
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categoriesData,
      title: { text: xaxisName },
    },
    yaxis: {
      title: { text: yaxisName },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      // offsetY: -25,
      // offsetX: -5
    }
  };

  const series = [
    {
      name: xSeriesName,
      data: seriesData,
    },
    {
      name: xSeriesName2,
      data: seriesData2,
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
          <Chart
            options={options}
            series={series}
            type={graphType}
            width="550"
          />
        </div>
      </div>
    </div>
  );
};
