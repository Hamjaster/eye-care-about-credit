"use client";

import * as React from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Task {
  id: number;
  teamMember: string;
  taskName: string;
  created: string;
  link?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      teamMember: "Not assigned to any team member",
      taskName: "Remember to complete your 'To-Do' Items on your",
      created: "10/21/2023 13:59",
    },
    {
      id: 2,
      teamMember: "Carlos",
      taskName: "Complete my Company Profile",
      created: "10/21/2023 13:59",
    },
    {
      id: 3,
      teamMember: "Carlos",
      taskName: "Set my default Client Agreement",
      created: "10/21/2023 13:59",
    },
    {
      id: 4,
      teamMember: "Carlos",
      taskName: "Add my Team Members",
      created: "10/21/2023 13:59",
    },
    {
      id: 5,
      teamMember: "Carlos",
      taskName: "Log into my Sample Client and Run Wizard 1-2-3",
      created: "10/21/2023 13:59",
    },
    {
      id: 6,
      teamMember: "Carlos",
      taskName: "RD2 (Jasmine Starks)",
      created: "11/20/2023 14:22",
    },
    // Add more tasks as needed
  ]);

  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [category, setCategory] = React.useState("everyone");

  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setTasks(sortedTasks);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">
            Tasks for Ameco Capital Inc
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Category</span>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Member</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead className="cursor-pointer" onClick={sortTasks}>
              <div className="flex items-center gap-2">
                Created
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    sortDirection === "desc" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 border-2 w-8">
                    <AvatarFallback>
                      {task.teamMember === "Not assigned to any team member"
                        ? "NA"
                        : task.teamMember.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{task.teamMember}</span>
                </div>
              </TableCell>
              <TableCell>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  {task.taskName}
                </a>
              </TableCell>
              <TableCell>{task.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-right text-sm text-gray-500">
        Total Rows: {tasks.length}
      </div>
    </div>
  );
}
