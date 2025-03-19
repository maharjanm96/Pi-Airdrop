import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateSeedPhrase } from "@/lib/utils";
import { SeedPhrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import React from "react";
import SeedPhraseDialog from "../seephrase-dialog";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

const fetchSeedPhrases = async () => {
  const { data } = await axios.get("/api/seedphrase");
  return data.data;
};

const SeedPhraseTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["seedphrases"],
    queryFn: fetchSeedPhrases,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-amber-200 font-medium"
          >
            {status}
          </Badge>
        );
      case "CHECKED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200 font-medium"
          >
            {status}
          </Badge>
        );
      case "DECLINED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200 font-medium"
          >
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: ColumnDef<SeedPhrase>[] = [
    {
      accessorKey: "seedphrase",
      header: "Seed Phrase",
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {truncateSeedPhrase(row.original.seedPhrase)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="font-medium">
          {moment(row.original.createdAt).format("MMM Do YYYY, h:mm A")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <SeedPhraseDialog
                seedPhrase={row.original}
                trigger={
                  <DropdownMenuItem
                    className="text-sm font-medium"
                    onSelect={(e) => e.preventDefault()}
                  >
                    View & Edit
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm font-medium">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default SeedPhraseTable;
