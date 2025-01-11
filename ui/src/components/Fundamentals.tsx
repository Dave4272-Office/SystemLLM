"use client";
import { FinancialSummaryChart } from "@/components/FinancialSummaryChart";
import { RatioSummaryChart } from "@/components/RatioSummaryChart";
import { TabPanel } from "@/components/common/TabPanel";
import { chartDataConversion } from "@/library/helper";
import { Card, CardContent, Grid2, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

interface FinancialPlotData {
  financial_summary: { [k: string]: { [k: string]: number } };
  ratio_summary: { [k: string]: { [k: string]: number } };
}

// function createResource<T>(promise: Promise<T>) {
//   let status = "pending";
//   let result: T;

//   const suspender = promise
//     .then((res) => {
//       status = "success";
//       result = res;
//     })
//     .catch((err) => {
//       status = "error";
//       result = err;
//     });

//   return {
//     read() {
//       if (status === "pending") {
//         throw suspender; // Suspense will show the fallback
//       } else if (status === "error") {
//         throw result; // Let ErrorBoundary handle the error
//       } else if (status === "success") {
//         return result;
//       }
//     },
//   };
// }

export default function Fundamentals({
  ticker,
}: Readonly<{ ticker?: string }>) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [chartData, setChartData] = useState<{
    financial_summary: { year: string }[];
    ratio_summary: { year: string }[];
  }>({ financial_summary: [], ratio_summary: [] });

  useEffect(() => {
    async function fetchData() {
      if (ticker === undefined) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/financial_plot_transpose?ticker=${ticker}`
        );
        if (!response.ok) {
          setChartData({ financial_summary: [], ratio_summary: [] });
          return;
        }
        const value = (await response.json()) as FinancialPlotData;
        setChartData({
          financial_summary: chartDataConversion(value["financial_summary"]),
          ratio_summary: chartDataConversion(value["ratio_summary"]),
        });
      } catch (error) {
        console.error(error);
        setChartData({ financial_summary: [], ratio_summary: [] });
      }
    }
    fetchData();
  }, [ticker]);

  return (
    <Card sx={{ height: "100%", display: "flex" }} variant="outlined">
      <CardContent
        sx={{
          justifyContent: "center",
          display: "flex",
          // bgcolor: "background.paper",
          flex: 1,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          orientation="vertical"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Finance Chart" />
          <Tab label="Test Place" />
          <Tab label="Test Place" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Grid2 container sx={{ display: "flex", flex: 1 }}>
            <Grid2 sx={{ display: "flex", flex: 1 }}>
              <FinancialSummaryChart data={chartData.financial_summary} />
            </Grid2>
            <Grid2 sx={{ display: "flex", flex: 1 }}>
              <RatioSummaryChart data={chartData.ratio_summary} />
            </Grid2>
          </Grid2>
        </TabPanel>
        <TabPanel value={currentTab} index={1}></TabPanel>
        <TabPanel value={currentTab} index={2}>
          Content for Tab Three
        </TabPanel>
      </CardContent>
    </Card>
  );
}
