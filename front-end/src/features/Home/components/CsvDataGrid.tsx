// CsvDataGrid.tsx

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CsvType, columnsConfig } from "../types";
import { Theme, styled } from "@mui/material/styles";

interface CsvDataGridProps {
  data: CsvType[];
  isLoading: boolean;
}

export const CsvDataGrid: React.FC<CsvDataGridProps> = ({ data, isLoading }) => {
  const { columns } = columnsConfig();
  return (
    <div style={{ height: 500, width: "100%" }}>
      <StyledDataGrid
        rows={data} // Use a propriedade 'dados' para os dados
        columns={columns} // Certifique-se de que 'columns' esteja definido
        style={{ color: "#f0f0f0" }}
        getRowId={(row) => `${row.nrInst}-${row.nrAgencia}-${row.cdClient}-${row.nrContrato}`}
        loading={isLoading}
      />
    </div>
  );
};

function customCheckbox(theme: Theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.mode === "light" ? "#b8b8b8" : "rgb(67, 67, 67)"}`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after": {
      width: 8,
      height: 8,
      backgroundColor: "#1890ff",
      transform: "none",
      top: "39%",
      border: 0,
    },
  };
}
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "1px solid #b8b8b8",
  color: theme.palette.mode === "light" ? "#b8b8b8" : "rgba(255,255,255,0.85)",
  fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#b8b8b8" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${theme.palette.mode === "light" ? "#b8b8b8" : "#303030"}`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.mode === "light" ? "#b8b8b8" : "#303030"}`,
  },
  "& .MuiDataGrid-cell": {
    color: theme.palette.mode === "light" ? "black" : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));
