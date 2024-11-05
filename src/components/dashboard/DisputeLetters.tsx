import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import AddLetterModal from "./AddLetterModal";
import { LetterType } from "@/lib/type";
import { useAppSelector } from "@/store/redux";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function DisputeLetters() {
  const DATA = useAppSelector((state) => state.letters.letters);
  const [letterData, setLetterData] = useState(DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    setLetterData(
      DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setLetterData((letters) => {
      return DATA.filter((letter) =>
        letter.title.toLocaleLowerCase().includes(searchTerm)
      );
    });
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Serch By Letter Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-websitePrimary hover:text-websitePrimaryDark"
              >
                Category <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData(DATA);
                }}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData((letters) => {
                    return DATA.filter((letter) => {
                      return letter.category === "Legal";
                    });
                  });
                }}
              >
                Legal
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setLetterData((letters) => {
                    return DATA.filter((letter) => {
                      return letter.category === "Appreciation";
                    });
                  });
                }}
              >
                Appreciation
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setLetterData((letters) => {
                    return DATA.filter((letter) => {
                      return letter.category === "Introduction";
                    });
                  });
                }}
              >
                Introduction
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setLetterData((letters) => {
                    return DATA.filter((letter) => {
                      return letter.category === "Agreement";
                    });
                  });
                }}
              >
                Agreement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-websitePrimary hover:text-websitePrimaryDark"
              >
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData(DATA);
                }}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData((clients) => {
                    return DATA.filter((letter) => {
                      return letter.status === "Active";
                    });
                  });
                }}
              >
                Active Letters
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData((clients) => {
                    return DATA.filter((letter) => {
                      return letter.status === "Inactive";
                    });
                  });
                }}
              >
                Inactive Letters
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLetterData((clients) => {
                    return DATA.filter((letter) => {
                      return letter.status === "Pending";
                    });
                  });
                }}
              >
                Pending Letters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            + Add New Letter
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Letter Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Favourite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {letterData.map((letter, index) => (
              <TableRow key={index}>
                <TableCell className="hover:underline cursor-pointer">
                  {letter.title}
                </TableCell>
                <TableCell>{letter.category}</TableCell>
                <TableCell>{letter.status}</TableCell>
                <TableCell>{letter.favorite ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
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
      <AddLetterModal
        setLetterData={setLetterData}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
