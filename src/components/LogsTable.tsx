
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Log } from "@/services/api";

interface LogsTableProps {
  logs: Log[];
  date: string;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, date }) => {
  return (
    <div className="bg-white rounded-md shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Log for {date}</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>User</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {log.status === "success" ? "Успішно" : "Помилка"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Деталі
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No logs found for this date
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogsTable;
