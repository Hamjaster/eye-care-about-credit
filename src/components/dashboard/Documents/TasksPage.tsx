"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
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
  category: "everyone" | "team" | "personal" | "client";
  link?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      teamMember: "Not assigned",
      taskName: "Remember to complete your 'To-Do' Items on your",
      created: "10/21/2023 13:59",
      category: "everyone",
    },
    {
      id: 2,
      teamMember: "Carlos",
      taskName: "Complete my Company Profile",
      created: "10/21/2023 13:59",
      category: "personal",
    },
    {
      id: 34,
      teamMember: "Hamza",
      taskName: "Complete my Company Profile",
      created: "10/21/2023 13:59",
      category: "team",
    },
    {
      id: 3,
      teamMember: "Carlos",
      taskName: "Set my default Client Agreement",
      created: "10/21/2023 13:59",
      category: "team",
    },
    {
      id: 4,
      teamMember: "Carlos",
      taskName: "Add my Team Members",
      created: "10/21/2023 13:59",
      category: "team",
    },
    {
      id: 5,
      teamMember: "Carlos",
      taskName: "Log into my Sample Client and Run Wizard 1-2-3",
      created: "10/21/2023 13:59",
      category: "client",
    },
    {
      id: 6,
      teamMember: "Carlos",
      taskName: "RD2 (Jasmine Starks)",
      created: "11/20/2023 14:22",
      category: "client",
    },
  ]);

  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [category, setCategory] = React.useState("everyone");
  const [selectedMemberOrClient, setSelectedMemberOrClient] =
    React.useState("");

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

  const filteredTasks = tasks.filter((task) => {
    if (category === "everyone") return true;
    if (category === "team" || category === "client") {
      return (
        task.category === category && task.teamMember === selectedMemberOrClient
      );
    }
    return task.category === category;
  });

  const teamMembers = Array.from(
    new Set(
      tasks
        .filter((task) => task.category === "team")
        .map((task) => task.teamMember)
    )
  );
  const clients = Array.from(
    new Set(
      tasks
        .filter((task) => task.category === "client")
        .map((task) => task.teamMember)
    )
  );

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
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setSelectedMemberOrClient("");
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>

              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="team">Team Member</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
          {(category === "team" || category === "client") && (
            <Select
              value={selectedMemberOrClient}
              onValueChange={setSelectedMemberOrClient}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Select ${category}`} />
              </SelectTrigger>
              <SelectContent>
                {(category === "team" ? teamMembers : clients).map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 border-2 w-8">
                    <AvatarFallback>
                      {task.teamMember === "Not assigned"
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
        Total Rows: {filteredTasks.length}
      </div>
    </div>
  );
}
