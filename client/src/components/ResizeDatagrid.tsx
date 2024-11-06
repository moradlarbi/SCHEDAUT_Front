import { DataGrid } from "@mui/x-data-grid";
import React from "react";

type IProps = {
  columns: any[];
  rows: any[];
  [x: string]: any;
};

function ResizeDataGrid({ columns, rows, resizeRef, ...props }: IProps) {
  const handleColumnWidthChange = React.useCallback(
    (field: string, width: number) => {
      const headerElement = document.querySelector(
        `.MuiDataGrid-columnHeader[data-field="${field}"]`
      );
      const cellElements = document.querySelectorAll(
        `.MuiDataGrid-cell[data-field="${field}"]`
      );

      if (headerElement) {
        headerElement.setAttribute("style", `width:${width}px`);
      }
      if (cellElements) {
        cellElements?.forEach((cell) => {
          cell.setAttribute("style", `width:${width}px`);
        });
      }
    },
    []
  );

  const renderResizableHeader = React.useCallback(
    (params: { field: any; colDef: { headerName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => {
      const column = columns.find((col) => col.field === params.field);
      if (column) {
        let headers = document.querySelector(
          `.MuiDataGrid-columnHeader[data-field="${column.field}"] .MuiDataGrid-iconSeparator`
        );
        const headerElement: HTMLElement | null = document.querySelector(
          `.MuiDataGrid-columnHeader[data-field="${column.field}"]`
        );
        if (headers) {


          headers?.classList.add("handler");
          (headers as HTMLElement).style.cursor = "col-resize";
          headers?.addEventListener("mousedown", (event: any) => {
            const startX = event.clientX;

            const startWidth = Number(headerElement!.style.width.split("px")[0]);

            const handleMouseMove = (e: MouseEvent) => {
              const width = startWidth + e.clientX - startX;
              if (column.minWidth) {
                if (width > column?.minWidth + 10)
                  handleColumnWidthChange(column.field, width);
              } else {
                handleColumnWidthChange(column.field, width);
              }
            };

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          });
        }
        return (
          <div
            style={{
              width: "100%",
            }}
          >
            <div>{params.colDef.headerName}</div>
          </div>
        );
      }
      return null;
    },
    [columns, handleColumnWidthChange]
  );
  columns.map((e) => {
    const headerElement: HTMLElement | null = document.querySelector(
      `.MuiDataGrid-columnHeader[data-field="${e.field}"]`
    );
    const width = Number(headerElement?.style.width.split("px")[0]);
    const cellElements = document.querySelectorAll(
      `.MuiDataGrid-cell[data-field="${e.field}"]`
    );

    if (cellElements) {
      cellElements?.forEach((cell) => {
        cell.setAttribute("style", `width:${width}px`);
      });
    }
  });
  return (
    <DataGrid
      {...props}
      sx={{
        fontSize: 15,
        fontWeight: 600,
        ".MuiDataGrid-editInputCell": {
          fontSize: "18px"
        },
        ' .MuiDataGrid-row:hover': {
          cursor: 'pointer'
        },
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },

      }}
      rows={rows}
      columns={columns.map((column) => ({
        ...column,
        renderHeader: renderResizableHeader,
      }))}
    />
  );
}

export default ResizeDataGrid;