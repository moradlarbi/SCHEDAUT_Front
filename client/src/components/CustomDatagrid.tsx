import * as React from "react";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { AxiosResponse } from "axios";
import { BACKENDINFO, Columns, IProps } from "../types/index";
import axios from "../api/axios";
import ResizeDataGrid from "./ResizedDatagrid"

const initState: BACKENDINFO = {
  page: 0,
  pageSize: 10,
  total: 20,
  filter: [],
  sort: { field: "id", sort: "asc" },
  rows: [],
  refresh: false,
};
/**

Reducer function for managing state related to pagination, sorting, and filtering
@param {Object} state - The current state
@param {Object} action - The action to perform
@param {string} action.type - The type of action to perform
@param {Array} [action.payload] - The payload for the action
@param {Array} [action.payload.total] - The total number of rows after filtering
@param {Array} [action.payload.rows] - The filtered and sorted rows to display
@param {Array} [action.payload.filter] - The filter parameters to apply
@param {Array} [action.payload.sort] - The sort parameters to apply
@param {number} [action.payload.page] - The page number to display
@param {number} [action.payload.pageSize] - The number of rows to display per page

@property {Array} [action.payload.filter] - The filter parameters to apply
@property {Array} [action.payload.sort] - The sort parameters to apply
@property {number} [action.payload.page] - The page number to display
@property {number} [action.payload.pageSize] - The number of rows to display per page
@property {number} [action.payload.total] - The total number of rows after filtering
@property {Array} [action.payload.rows] - The filtered and sorted rows to display

@returns {Object} - The new state after the action has been performed
*/

const operatorMappings: { [key: string]: string } = {
  contains: "$containsi",
  equals: "$eqi",
  "": "",
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SORT":
      return {
        ...state,
        refresh: !state.refresh,
        sort: {
          field: action.payload.field,
          sort: action.payload.sort,
        },
      };

    case "FILTER":
      return {
        ...state,
        refresh: !state.refresh,

        filter: [...action.payload],
      };
    case "PAGINATION":
      return {
        ...state,
        refresh: !state.refresh,
        page: action.payload?.page,
        pageSize: action.payload?.pageSize,
      };

    case "ROWS":
      return {
        ...state,
        total: action.payload?.total,
        rows: action.payload.data ? [...action.payload.data] : [],
      };

    default:
      return state;
  }
};

/**
 *
 * @param columns - The columns to display
 * @param info - The info to display in the modal
 * @param add - show whether to add a new row or not
 * @param fetchurl - The url to fetch data from backend
 * @param refreshParent - The function to refresh the parent
 * @param deleteFunction - The function to delete a row
 * @param editFunction - The function to edit a row
 * @param deleteRow - The function to delete a row
 * @param addFunction - The function to add a new row
 * @param edit - show whether edit or not
 * @params ...datagridProps - The native props to pass to the data grid
 * @returns     The data grid
 */

export default function CustomDataGrid({
  columns,
  info,
  add,
  fetchurl,
  refreshParent,
  addFunction,
  editFunction,
  deleteFunction,
  edit,
  deleteRow,
  ...datagridProps
}: Partial<IProps>) {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const [loading, setLoading] = React.useState(false);
  const query: { field: string; operator: string; value: string }[] =
    state.filter.map((i: any) => ({
      field: i.field,
      value: i.value,
      operator: operatorMappings[i.operator] || i.operator,
    }));

  const getData = () => {
    setLoading(true);
    axios
      .get(
        `${fetchurl}&pagination[page]=${
          Number(state.page) + 1
        }&pagination[pageSize]=${state.pageSize}&sort[0]=${state.sort.field}:${
          state.sort.sort
        }`,
      )
      .then((res: AxiosResponse<any, any>) => {
        if (res.status == 200) {
          //console.log(res.data)
          dispatch({
            type: "ROWS",
            payload: {
              data: res.data,
              total: res.data?.length,
            },
          });
          setLoading(false);
        }
      })
      .catch((e : any) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getData();
  }, [state.refresh, refreshParent]);

  return (
    <Box sx={{ minHeight: 400, height: "80%", width: "100%" }}>
      <ResizeDataGrid
        sortingMode="server"
        filterMode="server"
        onFilterModelChange={(data: { items: any; }) => {
          dispatch({ type: "FILTER", payload: data.items });
        }}
        onSortModelChange={(data: any) => {
          dispatch({
            type: "SORT",
            payload: {
              field: data[0].field,
              sort: data[0].sort,
            },
          });
        }}
        pagination
        paginationMode="server"
        rows={state.rows}
        rowCount={state.total}
        columns={columns as Columns[] & GridColDef[]}
        paginationModel={{
          page: state.page,
          pageSize: state.pageSize,
        }}
        onPaginationModelChange={(e: { page: any; pageSize: any; }) => {
          dispatch({
            type: "PAGINATION",
            payload: {
              page: e.page,
              pageSize: e.pageSize,
            },
          });
        }}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        {...datagridProps}
      />
    </Box>
  );
}