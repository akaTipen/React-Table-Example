import React from "react";
import { Row, Col } from "reactstrap";
import { useTable, useSortBy, usePagination } from "react-table";
import { columns, data } from "./dataSource";

function Table() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="mb1 form-inline">
        Show&nbsp;
        <select
          style={{ width: "60px" }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        &nbsp; entries
      </div>
      <table
        className="table table-sm table-striped"
        width="100%"
        {...getTableProps()}
      >
        <thead className="table-primary">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 
      Pagination can be built however you'd like. 
      This is just a very basic UI implementation:
    */}
      <Row>
        <Col xs="6">
          <div className="form-inline">
            <label>
              Page&nbsp;
              <strong>
                {pageIndex + 1} of {pageOptions.length}&nbsp;
              </strong>
            </label>
            &nbsp;<label>| Go to page:</label>&nbsp;
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "80px" }}
            />
          </div>
        </Col>
        <Col xs="6">
          <div className="form-inline float-right">
            <button
              className="btn btn-outline-secondary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            &nbsp;
            <button
              className="btn btn-outline-secondary"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
            &nbsp;
            <button
              className="btn btn-outline-secondary"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>
            &nbsp;
            <button
              className="btn btn-outline-secondary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
}

function React_Table_V7() {
  return (
    <Row>
      <Col className="col" xs="6">
        <Table />
      </Col>
    </Row>
  );
}

export default React_Table_V7;
