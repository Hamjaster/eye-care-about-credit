"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

// Types for our data
type TimelineItem = {
  id: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  actionType: string;
  client: {
    name: string;
    id: string;
  };
};

type TimelineDay = {
  date: string;
  label?: string;
  items: TimelineItem[];
};

// Sample data
const timelineData: TimelineDay[] = [
  {
    date: "2024-10-30",
    label: "Today",
    items: [
      {
        id: "1",
        timestamp: "02:15 AM",
        user: {
          name: "Carlos",
          avatar: "C",
        },
        action: "Letter created",
        actionType: "letter",
        client: {
          name: "David Daughrity",
          id: "dd1",
        },
      },
      {
        id: "2",
        timestamp: "02:15 AM",
        user: {
          name: "Carlos",
          avatar: "C",
        },
        action: "Letter created",
        actionType: "letter",
        client: {
          name: "David Daughrity",
          id: "dd1",
        },
      },
      {
        id: "3",
        timestamp: "02:15 AM",
        user: {
          name: "Carlos",
          avatar: "C",
        },
        action: "Letter reminder",
        actionType: "reminder",
        client: {
          name: "David Daughrity",
          id: "dd1",
        },
      },
    ],
  },
  {
    date: "2024-10-29",
    label: "Yesterday",
    items: [
      {
        id: "4",
        timestamp: "02:18 PM",
        user: {
          name: "Allyssa",
          avatar: "A",
        },
        action: "Letter created",
        actionType: "letter",
        client: {
          name: "SHANTELL KING",
          id: "sk1",
        },
      },
      {
        id: "5",
        timestamp: "02:18 PM",
        user: {
          name: "Allyssa",
          avatar: "A",
        },
        action: "Task marked as",
        actionType: "complete",
        client: {
          name: "SHANTELL KING",
          id: "sk1",
        },
      },
      {
        id: "8",
        timestamp: "02:18 PM",
        user: {
          name: "Allyssa",
          avatar: "A",
        },
        action: "Task marked as",
        actionType: "complete",
        client: {
          name: "SHANTELL KING",
          id: "sk1",
        },
      },
    ],
  },
  {
    date: "2024-10-29",

    items: [
      {
        id: "4",
        timestamp: "02:18 PM",
        user: {
          name: "Allyssa",
          avatar: "A",
        },
        action: "Letter created",
        actionType: "letter",
        client: {
          name: "SHANTELL KING",
          id: "sk1",
        },
      },
      {
        id: "5",
        timestamp: "02:18 PM",
        user: {
          name: "Allyssa",
          avatar: "A",
        },
        action: "Task marked as",
        actionType: "complete",
        client: {
          name: "SHANTELL KING",
          id: "sk1",
        },
      },
    ],
  },
];

export default function ProgressPage() {
  const [category, setCategory] = useState<string>("everyone");
  const [filteredData, setFilteredData] = useState<TimelineDay[]>(timelineData);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // Here you would typically filter the data based on the selected category
    // For this example, we're just setting the same data
    setFilteredData(timelineData);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Progress at Ameco Capital Inc
        </h1>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Category</div>
        <div className="flex flex-row space-x-4 items-center">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="me">Me</SelectItem>
              <SelectItem value="clients">Clients</SelectItem>
              <SelectItem value="team">Team Member</SelectItem>
            </SelectContent>
          </Select>
          {category === "clients" && (
            <>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Carlos</SelectItem>
                  <SelectItem value="me">John Doe</SelectItem>
                  <SelectItem value="clients">Hasnat Khan</SelectItem>
                  <SelectItem value="team">Angle Yu</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>

      <div className="s">
        {filteredData.map((day) => (
          <div key={day.date}>
            <div className="flex items-center gap-2 ">
              <div className="-translate-x-1.5 h-4 w-4 border-2 border-websitePrimary rounded-full" />
              <h2 className="text-sm font-medium">
                {day.label} ({day.date})
              </h2>
            </div>

            <div className="border-l-2 border-red-200 pl-6 space-y-4 py-8">
              {day.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="text-sm text-gray-500 w-16 pt-1">
                    {item.timestamp}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 border-2 text-gray-700">
                      {item.user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">{item.user.name}</span>
                      <span className="mx-1">{item.action}</span>
                      {item.actionType !== "complete" && (
                        <span>for client </span>
                      )}
                      <a
                        href={`/clients/${item.client.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.client.name}
                      </a>
                      {item.actionType === "complete" && (
                        <span className="text-green-600"> complete</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
