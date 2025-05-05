
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ActivityLogProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  // Helper function to get day of week abbreviation
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = format(date, "E");
    return dayOfWeek.substring(0, 2);
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-medium mb-4">Журнал активності</h2>
      <div className="space-y-2">
        {dates.map((date) => (
          <div key={date} className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => onSelectDate(date)}
              className={cn(
                "w-full justify-between hover:bg-gray-100",
                selectedDate === date && "bg-blue-50 hover:bg-blue-50"
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  selectedDate === date && "text-blue-600"
                )}
              >
                {date}
              </span>
              <span
                className={cn(
                  "text-gray-500",
                  selectedDate === date && "text-blue-600"
                )}
              >
                {getDayOfWeek(date)}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
