"use client";
import Fundamentals from "@/components/Fundamentals";
import { gql, useSuspenseQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid2,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function StockAnalysis() {
  const [tickers, setTickers] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const { data } = useSuspenseQuery<{ tickers: string[] }>(
    gql`
      query Tickers {
        tickers
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    setTickers(data.tickers);
    setSelectedTicker(data.tickers[0]);
  }, [data.tickers]);

  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Ticker Selection
      </Typography>
      <Grid2
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
          <SelectTicker
            tickers={tickers}
            selectedTicker={selectedTicker}
            setSelectedTicker={setSelectedTicker}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
          <SelectedTickerLogo selectedTicker={selectedTicker} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}></Grid2>
      </Grid2>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Fundamentals ticker={selectedTicker ?? undefined} />
    </>
  );
}

function SelectTicker({
  tickers,
  selectedTicker,
  setSelectedTicker,
}: Readonly<{
  tickers: string[];
  selectedTicker: string | null;
  setSelectedTicker: Dispatch<SetStateAction<string | null>>;
}>) {
  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <CardContent sx={{ justifyContent: "center", display: "flex" }}>
        <Autocomplete
          options={tickers}
          renderInput={(params) => <TextField {...params} label="Ticker" />}
          value={selectedTicker}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setSelectedTicker(newValue);
          }}
          style={{ flex: 1 }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <Image
                  loading="lazy"
                  width={20}
                  height={20}
                  src={`https://financialmodelingprep.com/image-stock/${option}.png`}
                  alt="Company Logo"
                />
                {option}
              </Box>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}

function SelectedTickerLogo({
  selectedTicker,
}: Readonly<{
  selectedTicker: string | null;
}>) {
  const size = 40;
  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <CardContent sx={{ justifyContent: "center", display: "flex" }}>
        {selectedTicker !== null ? (
          <Image
            loading="lazy"
            width={size}
            height={size}
            src={`https://financialmodelingprep.com/image-stock/${selectedTicker}.png`}
            alt="Selected Company Logo"
          />
        ) : (
          <Skeleton width={size} height={size} />
        )}
      </CardContent>
    </Card>
  );
}
