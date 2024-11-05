import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Search,
  Printer,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoFilterSharp, IoPrint } from "react-icons/io5";
import { MdImportExport } from "react-icons/md";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useReactToPrint } from "react-to-print";
import { table } from "console";
import AddClientModal from "./AddClientModal";
import { useNavigate } from "react-router-dom";
import { ClientType } from "@/lib/type";
import { useAppDispatch, useAppSelector } from "@/store/redux";

type FiltersType = {
  name: string;
  phoneNumber: string;
  clientStatus: string;
  planName: string;
  assignedTo: string;
  referredBy: string;
  billingStatus: string;
  startDateFrom: null | Date;
  startDateTo: null | Date;
  addedDateFrom: null | Date;
  addedDateTo: null | Date;
};
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function ClientsTable() {
  const DATA = useAppSelector((state) => state.clients.clients);
  const [clientData, setClientData] = useState(DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState<number>(0);
  const [filters, setFilters] = useState<FiltersType>({
    name: "",
    phoneNumber: "",
    clientStatus: "",
    billingStatus: "",
    planName: "",
    assignedTo: "",
    referredBy: "",
    startDateFrom: null,
    startDateTo: null,
    addedDateFrom: null,
    addedDateTo: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<any>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      phoneNumber: "",
      clientStatus: "",
      billingStatus: "",
      planName: "",
      assignedTo: "",
      referredBy: "",
      startDateFrom: null,
      startDateTo: null,
      addedDateFrom: null,
      addedDateTo: null,
    });
    setSelectedFiltersCount(0);
    setClientData(DATA);
  };

  const applyfilters = () => {
    console.log(filters, "applied filters");
    const filteredClients = clientData.filter((client) => {
      // Check name filter
      if (
        filters.name &&
        !(
          client.firstName.toLowerCase() + client.lastName.toLowerCase()
        ).includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      // Check client status filter
      if (
        filters.clientStatus &&
        client.status.toLowerCase() !== filters.clientStatus.toLowerCase()
      ) {
        return false;
      }

      // Check assigned to (team member) filter
      // if (
      //   filters.assignedTo &&
      //   !client.teamMember
      //     .toLowerCase()
      //     .includes(filters.assignedTo.toLowerCase())
      // ) {
      //   return false;
      // }

      // Check referred by filter
      // if (
      //   filters.referredBy &&
      //   !client.referredBy
      //     .toLowerCase()
      //     .includes(filters.referredBy.toLowerCase())
      // ) {
      //   return false;
      // }

      // Check start date range filter
      if (client.startDate) {
        const clientStartDate = new Date(client.startDate);
        if (filters.startDateFrom && clientStartDate < filters.startDateFrom) {
          return false;
        }
        if (filters.startDateTo && clientStartDate > filters.startDateTo) {
          return false;
        }
      }
      // Check added date range filter
      const clientAddedDate = new Date(client.added);
      if (filters.addedDateFrom && clientAddedDate < filters.addedDateFrom) {
        return false;
      }
      if (filters.addedDateTo && clientAddedDate > filters.addedDateTo) {
        return false;
      }

      // Additional filters can be added here as needed...

      return true; // If all checks pass, include the client in the filtered list
    });
    setClientData(filteredClients);
    setIsFilterOpen(false);
    countSelectedFilters();
    console.log(filteredClients, "client after filteration");
  };

  const countSelectedFilters = () => {
    let count = 0;

    // Check if each filter is selected (string isn't empty or date isn't null)
    if (filters.name) count++;
    if (filters.phoneNumber) count++;
    if (filters.clientStatus) count++;
    if (filters.planName) count++;
    if (filters.assignedTo) count++;
    if (filters.referredBy) count++;
    if (filters.billingStatus) count++;
    if (filters.startDateFrom) count++;
    if (filters.startDateTo) count++;
    if (filters.addedDateFrom) count++;
    if (filters.addedDateTo) count++;

    // Update state with the count
    setSelectedFiltersCount(count);
  };

  // Function to export client data as CSV
  const exportCSV = () => {
    const csvData = clientData.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );

    csvData.unshift(
      Object.keys(clientData[0])
        .map((key) => `"${key}"`)
        .join(",")
    );

    const blob = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "client_data.csv");
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to handle CSV import
  const importCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ran");
    const file = event.target.files?.[0];
    console.log(file, "file");
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").map((line) => line.split(","));
      const headers = lines[0].map((header) => header.replace(/"/g, "").trim());

      const importedData = lines.slice(1).map((line) =>
        headers.reduce((obj, header, index) => {
          obj[header] = line[index]?.replace(/"/g, "").trim();
          return obj;
        }, {} as any)
      );

      setClientData(importedData);
      console.log(importedData, "importedDATA");
    };

    reader.readAsText(file);
  };

  // FUNTIONS FOR TABLE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const totalPages = Math.ceil(DATA.length / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setClientData(
      DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setClientData((clients) => {
      return DATA.filter((client) =>
        (
          client.firstName.toLocaleLowerCase() +
          client.lastName.toLocaleLowerCase()
        ).includes(searchTerm)
      );
    });
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-websitePrimary hover:text-websitePrimaryDark"
              >
                Quick Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setClientData(DATA);
                }}
              >
                All Clients
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setClientData((clients) => {
                    return DATA.filter((client) => {
                      return client.status === "active";
                    });
                  });
                }}
              >
                Active Clients
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setClientData((clients) => {
                    return DATA.filter((client) => {
                      return client.status === "inactive";
                    });
                  });
                }}
              >
                Inactive Clients
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Filters POPUP */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                className={`relative space-x-3 text-sm font-semibold hover:text-websitePrimaryDark text-websitePrimary`}
                variant={"ghost"}
              >
                {selectedFiltersCount ? (
                  <div className="absolute top-1 left-1 text-[11px] w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white filter-count">
                    {selectedFiltersCount}
                  </div>
                ) : (
                  ""
                )}
                <div>Filters</div>
                <div>
                  <IoFilterSharp className="text-lg" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the filters for the client list.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Input
                    value={filters.name}
                    placeholder="Enter Name"
                    onChange={(event) =>
                      handleFilterChange("name", event.target.value)
                    }
                  />

                  <Input
                    placeholder="Phone Number"
                    value={filters.phoneNumber}
                    onChange={(e) =>
                      handleFilterChange("phoneNumber", e.target.value)
                    }
                  />
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("clientStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Client Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("billingStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Billing Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("planName", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Plan Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      {/* Add more plan options */}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("assignedTo", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assigned To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Team Members</SelectItem>
                      {/* Add more team member options */}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("referredBy", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Referred By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Referrals</SelectItem>
                      {/* Add more referral options */}
                    </SelectContent>
                  </Select>
                  <div>
                    <label className="text-sm font-medium mr-2">
                      Start Date
                    </label>
                    <div className="flex flex-row space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[120px] pl-3 text-left font-normal"
                          >
                            {filters.startDateFrom ? (
                              filters.startDateFrom.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filters.startDateFrom}
                            onSelect={(date) =>
                              handleFilterChange("startDateFrom", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[120px] pl-3 text-left font-normal"
                          >
                            {filters.startDateTo ? (
                              filters.startDateTo.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filters.startDateTo}
                            onSelect={(date) =>
                              handleFilterChange("startDateTo", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mr-2">
                      Added Date
                    </label>

                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[120px] pl-3 text-left font-normal"
                          >
                            {filters.addedDateFrom ? (
                              filters.addedDateFrom.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filters.addedDateFrom}
                            onSelect={(date) =>
                              handleFilterChange("addedDateFrom", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[120px] pl-3 text-left font-normal"
                          >
                            {filters.addedDateTo ? (
                              filters.addedDateTo.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filters.addedDateTo}
                            onSelect={(date) =>
                              handleFilterChange("addedDateTo", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset All
                  </Button>
                  <Button onClick={applyfilters}>Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* <Button
            className="space-x-3 text-base font-semibold hover:text-websitePrimaryDark text-websitePrimary"
            variant={"ghost"}
          >
            <div>Density</div>
            <div>
              <IoFilterSharp className="text-lg" />
            </div>
          </Button> */}
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the file input
            accept=".csv" // You can specify the file types you want to accept (optional)
            onChange={importCSV}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="space-x-2 text-sm font-semibold hover:text-websitePrimaryDark text-websitePrimary"
                variant={"ghost"}
              >
                <div>
                  <MdImportExport className="text-lg" />
                </div>
                <div>Import/Export</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportCSV}>Export</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click(); // Programmatically trigger the file input click
                  }
                }}
              >
                <div className="cursor-pointer">Import</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={reactToPrintFn}
            className="space-x-3 text-sm font-semibold hover:text-websitePrimaryDark text-websitePrimary"
            variant={"ghost"}
          >
            <div>Print</div>
            <div>
              <IoPrint className="text-lg" />
            </div>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Table Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            + Add Lead / Client
          </Button>
        </div>
      </div>
      <div ref={contentRef}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Team Members</TableHead>
              <TableHead>Referred By</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Start Date</TableHead>
              {/* <TableHead>Last Login</TableHead> */}
              <TableHead>Onboarding Stage</TableHead>
              <TableHead>Client Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientData.map((client, index) => (
              <TableRow key={index}>
                <TableCell
                  onClick={() =>
                    navigate("/dashboard/client-credit", { state: { client } })
                  }
                  className="hover:underline cursor-pointer"
                >
                  {client.firstName + " " + client.lastName}
                </TableCell>
                <TableCell>{client.assignedTo}</TableCell>
                <TableCell>{client.referredBy}</TableCell>
                <TableCell>
                  {client.added && client.added.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {client.startDate && client.startDate.toLocaleDateString()}
                </TableCell>
                {/* <TableCell>{client.lastLogin}</TableCell> */}
                <TableCell>
                  <span className="underline italic text-blue-600 text-sm">
                    {/* {client.onboardingStage} */}
                    Agreement Signed
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    10/7/24 11:42 AM
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 flex-row items-center">
                    <div
                      className={`${
                        client.status === "active"
                          ? "bg-green-500 "
                          : "bg-gray-500"
                      }  h-4 w-4 rounded-full`}
                    ></div>
                    <span className="text-sm capitalize font-semibold">
                      {client.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Send Client Logins</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Rows per page:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mx-1 border rounded-md"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
              currentPage * itemsPerPage,
              DATA.length
            )} of ${DATA.length}`}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AddClientModal
        setClients={setClientData}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
