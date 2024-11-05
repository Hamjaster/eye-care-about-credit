import React from "react";

import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { Calendar } from "lucide-react";

export default function DateSelector({
  text,
  value,
  onChange,
}: {
  text: string;
  value: any;
  onChange: (value: any) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-sm w-full pl-3 text-left font-normal"
        >
          {value ? value.toDateString() : <span>Select {text}</span>}

          <Calendar className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={value}
          onSelect={(date) => {
            // Logic for selecting DOB
            onChange(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
