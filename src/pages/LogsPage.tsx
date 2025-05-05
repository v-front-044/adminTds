
import React, { useState, useEffect } from "react";
import { getLogs, Log } from "@/services/api";
import LogsTable from "@/components/LogsTable";
import ActivityLog from "@/components/ActivityLog";

const LogsPage: React.FC = () => {
  // Generate some sample dates for the last 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async (date: string) => {
    setIsLoading(true);
    try {
      const data = await getLogs(date);
      setLogs(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(selectedDate);
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <ActivityLog
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
      <div className="md:col-span-3">
        {isLoading ? (
          <div className="h-40 flex items-center justify-center bg-white rounded-md shadow">
            <p className="text-gray-500">Loading logs...</p>
          </div>
        ) : (
          <LogsTable logs={logs} date={selectedDate} />
        )}
      </div>
    </div>
  );
};

export default LogsPage;
