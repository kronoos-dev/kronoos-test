import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Data } from "../model/Data";
import { useMemo, useReducer, useState } from "react";
import { useQuery } from "react-query";

const dataTableHelper = createColumnHelper<Data>();

const defaultColumns = [
  dataTableHelper.accessor("cdCarteira", {}),
  dataTableHelper.accessor("cdClient", {}),
  dataTableHelper.accessor("cdProduto", {}),
  dataTableHelper.accessor("dsCarteira", {}),
  dataTableHelper.accessor("dsProduto", {}),
  dataTableHelper.accessor("dtContrato", {}),
  dataTableHelper.accessor("dtVctPre", {}),
  dataTableHelper.accessor("idSitVen", {}),
  dataTableHelper.accessor("idSituac", {}),
  dataTableHelper.accessor("nmClient", {}),
  dataTableHelper.accessor("nrAgencia", {}),
  dataTableHelper.accessor("nrContrato", {}),
  dataTableHelper.accessor("nrCpfCnpj", {}),
  dataTableHelper.accessor("nrInst", {}),
  dataTableHelper.accessor("nrPresta", {}),
  dataTableHelper.accessor("nrProposta", {}),
  dataTableHelper.accessor("nrSeqPre", {}),
  dataTableHelper.accessor("qtPrestacoes", {}),
  dataTableHelper.accessor("tpPresta", {}),
  dataTableHelper.accessor("vlAtual", {}),
  dataTableHelper.accessor("vlDescon", {}),
  dataTableHelper.accessor("vlIof", {}),
  dataTableHelper.accessor("vlMora", {}),
  dataTableHelper.accessor("vlMulta", {}),
  dataTableHelper.accessor("vlOutAcr", {}),
  dataTableHelper.accessor("vlPresta", {}),
  dataTableHelper.accessor("vlTotal", {}),
];

export default function DataTable() {
  const rerender = useReducer(() => ({}), {})[1];
  const [orderBy] = useState<string>("id");
  const [order] = useState<string>("ASC");
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    page: pageIndex,
    pageSize,
    orderBy,
    order,
  };

  const query = useQuery({
    queryKey: ["data", fetchDataOptions],
    queryFn: async () => {
      const result = await fetch(
        `http://localhost:8080/data?page=${fetchDataOptions.page}&pageSize=${fetchDataOptions.pageSize}&orderBy=${fetchDataOptions.orderBy}&order=${fetchDataOptions.order}`,
      );
      const data = await result.json();
      return data;
    },
  });

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: query.data ?? defaultData,
    columns: defaultColumns,
    pageCount: query.data?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {query.isFetching ? "Loading..." : null}
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </div>
  );
}
