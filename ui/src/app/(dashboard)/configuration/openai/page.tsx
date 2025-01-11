"use client";

import { TabPanel } from "@/components/common/TabPanel";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Card, CardContent, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

interface OpenAIPrompt {
  name: string;
  value: string;
}

export default function ApiKeys() {
  const [rows, setRows] = useState<OpenAIPrompt[]>([]);
  const { data } = useSuspenseQuery<{ openAiPrompts: OpenAIPrompt[] }>(
    gql`
      query OpenAiPrompts {
        openAiPrompts {
          name
          value
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    setRows(data.openAiPrompts);
  }, [data.openAiPrompts]);

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  let i = 0;

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
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {rows.map((value) => (
            <Tab key={value.name} label={value.name} />
          ))}
        </Tabs>
        {rows.map((value) => {
          const j = i;
          i += 1;
          return (
            <TabPanel key={value.name} value={currentTab} index={j}>
              {/* <textarea value={value.value} style={{ flex: 1 }} contentEditable={false} readOnly /> */}
              {/* <TextField multiline value={value.value} fullWidth label="Prompt" style={{ flex: 1 }} sx={{ flex: 1}} /> */}
              <pre>{value.value}</pre>
            </TabPanel>
          );
        })}
      </CardContent>
    </Card>
  );
}
