"use client";

import { CustomAgGrid } from "@/library/grid";
import { gql, useSuspenseQuery } from "@apollo/client";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";

interface APIKeys {
  name: string;
  description: string;
  value: string;
}

const columns: ColDef<APIKeys>[] = [
  { field: "description", headerName: "API", width: 400 },
  {
    field: "value",
    headerName: "API Key Value",
    flex: 1,
    cellRenderer: (data: CustomCellRendererProps<APIKeys, string>) => {
      return <ApiKeyField value={data.value ?? ""} />;
    },
    cellStyle: {
      display: "flex",
    },
  },
  { headerName: "Action", width: 100 },
];

const ApiKeyField = ({ value }: { value: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleClickShowPassword = () => {
    setShowPassword(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };
  const handleClickHidePassword = () => {
    setShowPassword(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <form style={{ display: "flex", flex: 1 }}>
      <OutlinedInput
        value={value}
        type={showPassword ? "text" : "password"}
        contentEditable={false}
        autoComplete="off"
        endAdornment={
          <InputAdornment position="end">
            {showPassword ? (
              <VisibilityOff
                aria-label={"hide key"}
                onClick={handleClickHidePassword}
                style={{ flex: 1, cursor: "pointer" }}
              />
            ) : (
              <Visibility
                aria-label={"show key"}
                onClick={handleClickShowPassword}
                style={{ flex: 1, cursor: "pointer" }}
              />
            )}
          </InputAdornment>
        }
        label="Password"
        style={{ flex: 1 }}
      />
    </form>
  );
};

export default function ApiKeys() {
  const [rows, setRows] = useState<APIKeys[]>([]);
  const { data } = useSuspenseQuery<{ apiKeys: APIKeys[] }>(
    gql`
      query ApiKeys {
        apiKeys {
          name
          description
          value
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    setRows(data.apiKeys);
  }, [data.apiKeys]);

  return <CustomAgGrid rows={rows} columns={columns} />;
}
