"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Printer, ChevronDown, Trash2, Download, Upload } from "lucide-react";

interface Creditor {
  id: string;
  company: string;
  address: string;
  phone: string;
  accountType: string;
  notes: string;
}

export default function Creditors() {
  const [creditors, setCreditors] = useState<Creditor[]>([
    {
      id: "1",
      company: "PROGRESSIVE",
      address: "1516 W MOUND ST",
      phone: "",
      accountType: "",
      notes: "",
    },
    // Add more initial data as needed
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCreditor, setNewCreditor] = useState({
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    ext: "",
    accountType: "",
    notes: "",
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(creditors, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "creditors.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setCreditors(importedData);
        } catch (error) {
          console.error("Error importing data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDelete = (id: string) => {
    setCreditors(creditors.filter((creditor) => creditor.id !== id));
  };

  const handleAddCreditor = () => {
    const newCreditorEntry: Creditor = {
      id: Math.random().toString(36).substr(2, 9),
      company: newCreditor.company,
      address: `${newCreditor.address}, ${newCreditor.city}, ${newCreditor.state} ${newCreditor.zip}`,
      phone:
        newCreditor.phone + (newCreditor.ext ? ` ext. ${newCreditor.ext}` : ""),
      accountType: newCreditor.accountType,
      notes: newCreditor.notes,
    };
    setCreditors([...creditors, newCreditorEntry]);
    setIsDialogOpen(false);
    setNewCreditor({
      company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      ext: "",
      accountType: "",
      notes: "",
    });
  };

  const filteredCreditors = creditors.filter(
    (creditor) =>
      creditor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creditor.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Creditors/Furnishers</h1>
        </div>

        {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Creditors/Furnishers may have multiple addresses. Always double
            check that the company's mailing address is correct for your
            client's account.
          </p>
        </div> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Export/Import
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    document.getElementById("import-file")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              id="import-file"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>

          <Button
            className="w-full md:w-auto"
            onClick={() => setIsDialogOpen(true)}
          >
            Add New Creditor/Furnisher
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCreditors.map((creditor) => (
              <TableRow key={creditor.id}>
                <TableCell>{creditor.company}</TableCell>
                <TableCell>{creditor.address}</TableCell>
                <TableCell>{creditor.phone}</TableCell>
                <TableCell>{creditor.accountType}</TableCell>
                <TableCell>{creditor.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(creditor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Creditor/Furnisher</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name*</Label>
                  <Input
                    id="company"
                    value={newCreditor.company}
                    onChange={(e) =>
                      setNewCreditor({
                        ...newCreditor,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    value={newCreditor.accountType}
                    onValueChange={(value) =>
                      setNewCreditor({ ...newCreditor, accountType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                      <SelectItem value="loan">Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Address</Label>
                <div className="grid gap-4">
                  <Input
                    placeholder="Address"
                    value={newCreditor.address}
                    onChange={(e) =>
                      setNewCreditor({
                        ...newCreditor,
                        address: e.target.value,
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={newCreditor.city}
                      onChange={(e) =>
                        setNewCreditor({ ...newCreditor, city: e.target.value })
                      }
                    />
                    <Select
                      value={newCreditor.state}
                      onValueChange={(value) =>
                        setNewCreditor({ ...newCreditor, state: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input
                    id="zip"
                    value={newCreditor.zip}
                    onChange={(e) =>
                      setNewCreditor({ ...newCreditor, zip: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={newCreditor.phone}
                      onChange={(e) =>
                        setNewCreditor({
                          ...newCreditor,
                          phone: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Ext. (Optional)"
                      value={newCreditor.ext}
                      onChange={(e) =>
                        setNewCreditor({ ...newCreditor, ext: e.target.value })
                      }
                      className="w-32"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCreditor.notes}
                  onChange={(e) =>
                    setNewCreditor({ ...newCreditor, notes: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCreditor}>
                  Add New Creditor/Furnisher
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
