import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CreateCharts } from "../charts/createCharts";
import { CreatePredictionCharts } from "../charts/predictionChart";
import Navbar from "../Navbar";
import "../charts/charts.css";
import "../cardComponent/card.css";
import {
  getMnthRevenue,
  getHrsRevenue,
  getTopSellingData,
  getOrdersData,
  getReorderingPointArray,
} from "../../api/apiEndpoints";
import Card from "@mui/material/Card";
import ActionAreaCard from "../cardComponent/ActionAreaCard";
import ActionAreaCardNoImg from "../cardComponent/ActionAreaCardNoImg";
import StickyHeadTable from "../../components/reordering-table/reorderingTable";

export const Dashboard = (props) => {
  const [revenueSeries, setRevenueSeries] = useState([]);

  const [revenueSeries2, setRevenueSeries2] = useState([]);

  const [revenueCategories, setRevenueCategories] = useState([]);
  const [revenueCategories2, setRevenueCategories2] = useState([]);

  const [revenueHrsSeries, setRevenueHrsSeries] = useState([]);
  const [revenueHrsCategories, setRevenueHrsCategories] = useState([]);

  const [topSellingProducts, settopSellingProducts] = useState([]);

  const [totalRevenueTillDate, setTotalRevenueTillDate] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const [todaysTotalOrderes, setTodaysTotalOrderes] = useState(0);
  const [highestBasketSize, setHighestBasketSize] = useState(0);
  const [avgBasketSize, setAvgBasketSize] = useState(0);

  const [leastSellingProducts, setleastSellingProducts] = useState([]);

  const [reorderingProducts, setReorderingProducts] = useState([]);

  useEffect(() => {
    console.log("inside use effect");
    async function fetchMonthlyRevenueData() {
      const data = await getMnthRevenue();
      setRevenueSeries(data.series);
      setRevenueCategories(data.categories);

      var sum = 0;

      data.series.forEach((x) => {
        sum = sum + x;
      });
      console.log("sum", sum);

      setTotalRevenueTillDate(sum);
      console.log("Revenue: Data: ", data);
    }

    fetchMonthlyRevenueData();
  }, []);

  useEffect(() => {
    console.log("inside use effect");
    async function fetchtopSellingData() {
      const data = await getTopSellingData();
      settopSellingProducts(data);
      console.log("Topselling : Data: ", data);

      var qty = 0;
      data.map((x) => {
        qty = qty + x.quantity;
      });
      setTotalProductsSold(qty);

      const leastSellingProductAry = data
        .slice(0)
        .reverse()
        .map((element) => {
          return element;
        });
      setleastSellingProducts(leastSellingProductAry);
    }

    fetchtopSellingData();
  }, []);

  useEffect(() => {
    console.log("inside use effect");
    async function fetchHrsRevenueData() {
      const data = await getHrsRevenue();
      setRevenueHrsSeries(data.series);
      setRevenueHrsCategories(data.categories);
      console.log("Revenue: Data: ", data);

      var sum = 0;
      data.series.map((x) => {
        sum = sum + x;
      });
      setTodaySales(sum);
    }

    fetchHrsRevenueData();
  }, []);

  useEffect(() => {
    var temp = revenueSeries[5] + 2456;
    var t1 = [null, null, null, null, null, null]
    var d1 = [...t1, temp, Math.round(temp + randomIntFromInterval(5000,6000)), Math.round(temp + randomIntFromInterval(7000,8000))];
  
    setRevenueSeries2(d1);

    var d2 = [...revenueCategories, "Apr", "May", "Jun", "Jul"];

    setRevenueCategories2(d2);

    // console.log("new series",newSeries);
  }, [revenueSeries,revenueCategories]);

  useEffect(() => {
    console.log("inside use effect");
    async function fetchReorderingData() {
      const data = await getReorderingPointArray();

      const finalData = data.filter((x) => x.should_reorder === true);

      setReorderingProducts(finalData);

      console.log("fetchReorderingData : ", reorderingProducts);
    }

    fetchReorderingData();
  }, []);

  useEffect(() => {
    console.log("inside use effect");
    async function fetchOrdersData() {
      const data = await getOrdersData();
      setTodaysTotalOrderes(data.todaysTotalOrderes);
      setHighestBasketSize(data.highestBasketSize);
      setAvgBasketSize(data.avgBasketSize);
      console.log("orderData : ", data);
    }

    fetchOrdersData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container1">
        <h1 className="heading">Sales Activity</h1>
        <div className="cardLayout">
          <ActionAreaCard
            heading={"Today's Sales"}
            content={"$ " + todaySales}
            imgsource={"cardboard.jpg"}
          />

          <ActionAreaCard
            heading={"Today's total orders"}
            content={todaysTotalOrderes + " Orders"}
            imgsource={"cardboard.jpg"}
          />
          <ActionAreaCard
            heading={"Highest Basket size"}
            content={highestBasketSize + " Product"}
            imgsource={"cardboard.jpg"}
          />
          <ActionAreaCard
            heading={"Basket size average"}
            content={avgBasketSize}
            imgsource={"cardboard.jpg"}
          />

          <ActionAreaCard
            heading={"Total products sold"}
            content={totalProductsSold}
            imgsource={"cardboard.jpg"}
          />
          <ActionAreaCard
            heading={"Month's Revenue"}
            content={"$ " + revenueSeries[5]}
            imgsource={"cardboard.jpg"}
          />
          <ActionAreaCard
            heading={"Total Revenue"}
            content={"$ " + totalRevenueTillDate}
            imgsource={"cardboard.jpg"}
          />
        </div>

        <div className="club">
          <div className="mr-100 border">
            <h1 className="heading">Top Selling Products (Quantity)</h1>
            <ActionAreaCardNoImg
              heading={topSellingProducts[0]?.name}
              content={topSellingProducts[0]?.quantity}
            />
            <ActionAreaCardNoImg
              heading={topSellingProducts[1]?.name}
              content={topSellingProducts[1]?.quantity}
            />
            <ActionAreaCardNoImg
              heading={topSellingProducts[2]?.name}
              content={topSellingProducts[2]?.quantity}
            />
            <ActionAreaCardNoImg
              heading={topSellingProducts[3]?.name}
              content={topSellingProducts[3]?.quantity}
            />
            <ActionAreaCardNoImg
              heading={topSellingProducts[4]?.name}
              content={topSellingProducts[4]?.quantity}
            />
          </div>
          <div>
            <div className="mr-100 border">
              <h1 className="heading">Least Selling Products (Quantity)</h1>
              <ActionAreaCardNoImg
                heading={leastSellingProducts[0]?.name}
                content={leastSellingProducts[0]?.quantity}
              />
              <ActionAreaCardNoImg
                heading={leastSellingProducts[1]?.name}
                content={leastSellingProducts[1]?.quantity}
              />
              <ActionAreaCardNoImg
                heading={leastSellingProducts[2]?.name}
                content={leastSellingProducts[1]?.quantity}
              />
            </div>
          </div>
          <div>
            <StickyHeadTable rowdata={reorderingProducts} />
          </div>
        </div>
      </div>
      <div className="charts-p">
        <CreateCharts
          xtitle={"Months"}
          xseriesname={"Sales"}
          ytitle={"Amount in K"}
          charttitle={"Last 6 months Revenue"}
          seriesdata={revenueSeries}
          categoriesdata={revenueCategories}
        />
        <CreateCharts
          xtitle={"Hour"}
          xseriesname={"Sales"}
          ytitle={"Amount in K"}
          charttitle={"Today's Hourly Sales"}
          seriesdata={revenueHrsSeries}
          categoriesdata={revenueHrsCategories}
          graphtype={"bar"}
        />

        <CreatePredictionCharts
          xtitle={"Months"}
          xseriesname={"Sales"}
          ytitle={"Amount in K"}
          charttitle={"Future 3 months Sales Prediction"}
          seriesdata={revenueSeries}
          seriesdata2={revenueSeries2}
          xseriesname2={"Future sales"}
          categoriesdata={revenueCategories2}
        />

        {/* <CreateCharts
      xtitle={"Months"}
      xseriesname={"Sales"}
      ytitle={"Amount in K"}
      charttitle={"Monthly Revenue of Current Year"}
      seriesdata={[100, 40, 45, 50, 49, 60, 70, 91]}
    />
    */}
      </div>
    </>
  );
};



















function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}