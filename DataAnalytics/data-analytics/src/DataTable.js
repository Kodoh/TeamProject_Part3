import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  sortingFns,
} from "@tanstack/react-table";

  
export function DataTable({ data, columns }) {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel({ sortingFns }),
    state: {
      sorting
    },
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta;
              const isSortable = ["Employee", "Role", "Email"].includes(
                header.column.columnDef.header
              );
              return (
                <Th
                  key={header.id}
                  onClick={
                    isSortable ? header.column.getToggleSortingHandler() : null
                  }
                  isNumeric={meta?.isNumeric}
                  cursor={isSortable ? "pointer" : "default"}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {isSortable && header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      ) : (
                        <TriangleDownIcon aria-label="sorted descending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            <Td key={row.getVisibleCells().id}>
              {console.log(row.original.avatar)}

              <Avatar name={row.original.employee_name} src={row.original.avatar} />
            </Td>
            {row.getVisibleCells().slice(1).map((cell) => {
              const meta = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}