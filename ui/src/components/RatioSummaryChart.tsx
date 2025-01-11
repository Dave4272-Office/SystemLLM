"use client";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { CustomRechartsLegend } from "../library/recharts/CustomRechartsLegend";

export function RatioSummaryChart({
  data,
}: Readonly<{ data: { year: string }[] }>) {
  const [visibleLines, setVisibleLines] = useState<{ [k: string]: boolean }>({
    "Gross Profit Ratio": true,
    "EBITDA Ratio": true,
  });

  const handleLegendClick = (data: Payload) => {
    const key = String(data.dataKey);
    setVisibleLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const t = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickCount={15} />
        <Tooltip
          contentStyle={{ backgroundColor: t.palette.background.default }}
        />
        <Legend
          align="right"
          verticalAlign="top"
          layout="vertical"
          wrapperStyle={{ paddingLeft: 20 }}
          onClick={handleLegendClick}
          content={<CustomRechartsLegend />}
        />
        <Line
          dataKey="Gross Profit Ratio"
          stroke="#4285f4"
          color="#4285f4"
          strokeWidth={3}
          hide={!visibleLines["Gross Profit Ratio"]}
        />
        <Line
          dataKey="EBITDA Ratio"
          stroke="#db4437"
          color="#db4437"
          strokeWidth={3}
          hide={!visibleLines["EBITDA Ratio"]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
