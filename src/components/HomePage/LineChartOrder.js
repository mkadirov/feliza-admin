import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const LineChartOrder = ({list}) => {


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={400}
        data={list}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 80, // Increase bottom margin to make room for vertical labels
        }}
        barSize={20}
      >
        <XAxis
          dataKey="date"
          scale="point"
          padding={{ left: 10, right: 10 }}
          angle={-70}
          textAnchor="end"
          dy={10}
          interval={0}
          tick={{ width: 100, overflow: "visible" }} // Adjust width for long labels
        />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LineChartOrder;
