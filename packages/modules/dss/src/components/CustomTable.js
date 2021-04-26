import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, getTime } from "date-fns";
import { UpwardArrow, TextInput, Loader, Table } from "@egovernments/digit-ui-react-components";
import { useTable } from "react-table";

const CustomTable = ({
  data,
}) => {
  const { id } = data;
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const requestDate = {
    startDate: getTime(startOfMonth(new Date())),
    endDate: getTime(endOfMonth(new Date())),
    interval: "month",
    title: "",
  };
  const { isLoading, data: response } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate,
  });

  const tableColumns = useMemo(() => (
    response?.responseData?.data?.[0]?.plots?.map((plot) => ({
      Header: plot?.name,
      accessor: plot?.name,
      symbol: plot?.symbol,
      // Cell: (row) => row.original[plot?.name]
    }))
  ), [response]);

  const tableData = useMemo(() => (
    response?.responseData?.data?.map(rows => (
      rows.plots.reduce((acc, row) => {
        acc[row?.name] = row?.value !== null ? row?.value : row?.label || "";
        return acc;
      }, {})
    ))
  ), [response]);

  // const { getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  //   page,
  //   canPreviousPage,
  //   canNextPage,
  //   pageOptions,
  //   pageCount,
  //   gotoPage,
  //   nextPage,
  //   previousPage,
  //   setPageSize
  // } = useTable({
  //   columns: tableColumns,
  //   data: tableData
  // })

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Table
      className="customTable"
      t={t}
      data={tableData}
      columns={tableColumns}
      getCellProps={(cellInfo) => {
        return {
          style: {},
        };
      }}
    />
  )

  // return (
  //   <>
  //     <table className="customTable" {...getTableProps()}>
  //       <thead>
  //         {headerGroups.map(headerGroup => (
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {headerGroup.headers.map(column => (
  //               <th {...column.getHeaderProps()}>
  //                 {column.render("Header")}
  //               </th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody {...getTableBodyProps()}>
  //         {page.map(row => {
  //           prepareRow(row);
  //           return (
  //             <tr {...row.getRowProps()}>
  //               {row.cells.map(cell => {
  //                 return (
  //                   <td {...cell.getCellProps()}>
  //                     {cell.render("Cell")}
  //                   </td>
  //                 )
  //               })}
  //             </tr>
  //           )
  //         })}
  //       </tbody>
  //       {/* <tr>
  //         <td>1</td>
  //         <td>DDR A</td>
  //         <td>2 <UpwardArrow /> 2%</td>
  //         <td>3 <UpwardArrow /> 3%</td>
  //         <td>62 <UpwardArrow /> 62%</td>
  //         <td>64 <UpwardArrow /> 64%</td>
  //         <td>3.13 <UpwardArrow /> 3%</td>
  //         <td>100 <UpwardArrow /> 100%</td>
  //       </tr>
  //       <tr>
  //         <td>2</td>
  //         <td>DDR B</td>
  //         <td>0 <UpwardArrow /> 0%</td>
  //         <td>0 <UpwardArrow /> 0%</td>
  //         <td>226 <UpwardArrow /> 100%</td>
  //         <td>226 <UpwardArrow /> 100%</td>
  //         <td>0 <UpwardArrow /> 0%</td>
  //         <td>100 <UpwardArrow /> 100%</td>
  //       </tr> */}
  //     </table>
  //   </>
  // )
};

export default CustomTable;