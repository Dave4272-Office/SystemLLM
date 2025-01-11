"use client";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { CustomRechartsLegend } from "../library/recharts/CustomRechartsLegend";
import { rechartNumberFormatter } from "@/library/helper";

export function FinancialSummaryChart({
  data,
}: Readonly<{ data: { year: string }[] }>) {
  const [visibleBars, setVisibleBars] = useState<{ [k: string]: boolean }>({
    Revenue: true,
    "Operating Income": true,
    "Cashflow from Operations": true,
    "Free Cash Flow": true,
  });

  const handleLegendClick = (data: Payload) => {
    const key = String(data.dataKey);
    setVisibleBars((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const t = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <YAxis tickCount={15} tickFormatter={rechartNumberFormatter} />
        <Tooltip
          contentStyle={{ backgroundColor: t.palette.background.default }}
          formatter={(value) => rechartNumberFormatter(Number(value))}
        />
        <Legend
          align="right"
          verticalAlign="top"
          layout="vertical"
          wrapperStyle={{ paddingLeft: 20 }}
          onClick={handleLegendClick}
          content={<CustomRechartsLegend />}
        />
        <Bar
          dataKey="Revenue"
          fill="#4285f4"
          activeBar={<Rectangle fill="#3871cf" />}
          hide={!visibleBars["Revenue"]}
        />
        <Bar
          dataKey="Operating Income"
          fill="#db4437"
          activeBar={<Rectangle fill="#ba3a2f" />}
          hide={!visibleBars["Operating Income"]}
        />
        <Bar
          dataKey="Cashflow from Operations"
          fill="#f4b400"
          activeBar={<Rectangle fill="#cf9900" />}
          hide={!visibleBars["Cashflow from Operations"]}
        />
        <Bar
          dataKey="Free Cash Flow"
          fill="#0f9d58"
          activeBar={<Rectangle fill="#0d854b" />}
          hide={!visibleBars["Free Cash Flow"]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
