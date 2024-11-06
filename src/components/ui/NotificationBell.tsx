"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  id: number;
  type: "task" | "announcement";
  content: string;
  time: string;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "task",
    content: "New task assigned: Update user dashboard",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "announcement",
    content: "Team meeting scheduled for tomorrow at 10 AM",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "task",
    content: "Review pull request #42",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "announcement",
    content: "New company policy update",
    time: "1 day ago",
  },
  {
    id: 5,
    type: "task",
    content: "Complete project documentation",
    time: "2 days ago",
  },
];

export default function NotificationsBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.length;

  const clearNotifications = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">
              You have {unreadCount} unread messages
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-default">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.type === "task" ? "Task" : "Announcement"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-center"
            onClick={clearNotifications}
          >
            Clear all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
