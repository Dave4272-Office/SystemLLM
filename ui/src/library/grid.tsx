"use client"

import { useTheme } from "@mui/material";
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";


ModuleRegistry.registerModules([AllCommunityModule]);

export function CustomAgGrid<T = never>({rows, columns}: Readonly<{rows: T[], columns: ColDef<T>[]}>) {
  const t = useTheme();

  return (
    <div
      data-ag-theme-mode={t.palette.mode}
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={rows}
        columnDefs={columns}
        pagination={true}
      />
    </div>
  );
}