"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lock, ChevronUp, ChevronDown } from "lucide-react";

type Permission = {
  id: string;
  name: string;
  checked: boolean;
};

type PermissionCategory = {
  name: string;
  permissions: Permission[];
};

type Role = {
  id: string;
  name: string;
  permissions: PermissionCategory[];
};

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    permissions: [
      {
        name: "Clients & Leads",
        permissions: [
          { id: "cl1", name: "All clients & Leads", checked: true },
          { id: "cl2", name: "Assigned Clients & Leads Only", checked: false },
          { id: "cl3", name: "Delete", checked: false },
          { id: "cl4", name: "Add New Clients & Leads", checked: true },
        ],
      },
      {
        name: "Letter Library",
        permissions: [
          { id: "ll1", name: "Add/Edit/View", checked: true },
          { id: "ll2", name: "Delete", checked: false },
          { id: "ll3", name: "View Only", checked: false },
        ],
      },
      {
        name: "Invoice",
        permissions: [
          { id: "il1", name: "Add/Edit/View", checked: true },
          { id: "il2", name: "Delete", checked: false },
          { id: "il3", name: "View Only", checked: false },
        ],
      },
    ],
  },
  {
    id: "1",
    name: "Co-admin",
    permissions: [
      {
        name: "Clients & Leads",
        permissions: [
          { id: "cl1", name: "All clients & Leads", checked: true },
          { id: "cl2", name: "Assigned Clients & Leads Only", checked: false },
          { id: "cl3", name: "Delete", checked: false },
          { id: "cl4", name: "Add New Clients & Leads", checked: true },
        ],
      },
      {
        name: "Letter Library",
        permissions: [
          { id: "ll1", name: "Add/Edit/View", checked: true },
          { id: "ll2", name: "Delete", checked: false },
          { id: "ll3", name: "View Only", checked: false },
        ],
      },
      {
        name: "Invoice",
        permissions: [
          { id: "il1", name: "Add/Edit/View", checked: true },
          { id: "il2", name: "Delete", checked: false },
          { id: "il3", name: "View Only", checked: false },
        ],
      },
    ],
  },
  // Add more roles as needed
];

export default function RolesAndPermission() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  const sortRoles = () => {
    const sorted = [...roles].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setRoles(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePermissionChange = (
    roleId: string,
    categoryName: string,
    permissionId: string
  ) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.map((category) =>
                category.name === categoryName
                  ? {
                      ...category,
                      permissions: category.permissions.map((permission) =>
                        permission.id === permissionId
                          ? { ...permission, checked: !permission.checked }
                          : permission
                      ),
                    }
                  : category
              ),
            }
          : role
      )
    );
  };

  const addNewRole = () => {
    if (newRoleName) {
      const newRole: Role = {
        id: Date.now().toString(),
        name: newRoleName,
        permissions: [
          {
            name: "Clients & Leads",
            permissions: [
              { id: "cl1", name: "All clients & Leads", checked: false },
              {
                id: "cl2",
                name: "Assigned Clients & Leads Only",
                checked: false,
              },
              { id: "cl3", name: "Delete", checked: false },
              { id: "cl4", name: "Add New Clients & Leads", checked: false },
            ],
          },
          // Add more categories as needed
        ],
      };
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setIsAddRoleModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <div className="flex justify-between items-center ">
          <h2 className="text-4xl font-bold">Roles</h2>
          <Button
            className="bg-green-500 rounded-md font-semibold hover:bg-green-600"
            onClick={() => setIsAddRoleModalOpen(true)}
          >
            Add New Role
          </Button>
        </div>
        <Table className="my-8">
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={sortRoles}>
                Role Name{" "}
                {sortOrder === "asc" ? (
                  <ChevronUp className="inline" />
                ) : (
                  <ChevronDown className="inline" />
                )}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <span
                        className=" cursor-pointer text-websitePrimary hover:text-websitePrimaryDark"
                        onClick={() => setSelectedRole(role)}
                      >
                        {role.name === "Admin"
                          ? "View Permissions"
                          : "Manage Permissions"}
                      </span>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>
                          Manage Permissions ({role.name})
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        {role.permissions.map((category) => (
                          <div key={category.name} className="mb-4">
                            <h3 className="font-semibold mb-2">
                              {category.name}
                            </h3>
                            {category.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center mb-2"
                              >
                                <input
                                  type="checkbox"
                                  id={permission.id}
                                  checked={permission.checked}
                                  onChange={() =>
                                    handlePermissionChange(
                                      role.id,
                                      category.name,
                                      permission.id
                                    )
                                  }
                                  className="mr-2"
                                  disabled={role.name === "Admin"}
                                />
                                <label htmlFor={permission.id}>
                                  {permission.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  {role.name === "Admin" && (
                    <Lock className="inline-block text-xs w-4 text-websitePrimary ml-4 mb-0.5" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              placeholder="Enter role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <Button onClick={addNewRole} className="mt-4">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
