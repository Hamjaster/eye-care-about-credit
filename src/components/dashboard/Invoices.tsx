import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InvoiceItem {
  description: string;
  price: number;
}

interface Invoice {
  id: string;
  clientName: string;
  referenceNo: string;
  invoiceDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  total: number;
}

export default function Invoices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    items: [],
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });
  const [newItem, setNewItem] = useState<InvoiceItem>({
    description: "",
    price: 0,
  });

  const handleAddItem = () => {
    if (newItem.description && newItem.price > 0) {
      setNewInvoice((prev) => ({
        ...prev,
        items: [...(prev.items || []), newItem],
      }));
      setNewItem({ description: "", price: 0 });
    }
  };

  const handleRemoveItem = (index: number) => {
    setNewInvoice((prev) => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index),
    }));
  };

  const handleCreateInvoice = () => {
    const invoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: newInvoice.clientName || "",
      referenceNo: newInvoice.referenceNo || "",
      invoiceDate: newInvoice.invoiceDate || new Date(),
      dueDate: newInvoice.dueDate || new Date(),
      items: newInvoice.items || [],
      total: newInvoice.items?.reduce((sum, item) => sum + item.price, 0) || 0,
    };
    setInvoices((prev) => [...prev, invoice]);
    setIsDialogOpen(false);
    setNewInvoice({
      items: [],
      invoiceDate: new Date(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    });
  };

  const calculateTotal = () => {
    return newInvoice.items?.reduce((sum, item) => sum + item.price, 0) || 0;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference No</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Invoice Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.referenceNo}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>{format(invoice.invoiceDate, "PP")}</TableCell>
              <TableCell>{format(invoice.dueDate, "PP")}</TableCell>
              <TableCell className="text-right">
                ${invoice.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Select
                  onValueChange={(value) =>
                    setNewInvoice((prev) => ({ ...prev, clientName: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="acme-corp">Acme Corporation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reference No.</Label>
                <Input
                  value={newInvoice.referenceNo}
                  onChange={(e) =>
                    setNewInvoice((prev) => ({
                      ...prev,
                      referenceNo: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !newInvoice.invoiceDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newInvoice.invoiceDate ? (
                        format(newInvoice.invoiceDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newInvoice.invoiceDate}
                      onSelect={(date) =>
                        setNewInvoice((prev) => ({
                          ...prev,
                          invoiceDate: date || new Date(),
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !newInvoice.dueDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newInvoice.dueDate ? (
                        format(newInvoice.dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newInvoice.dueDate}
                      onSelect={(date) =>
                        setNewInvoice((prev) => ({
                          ...prev,
                          dueDate: date || new Date(),
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Invoice Items</Label>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                {newInvoice.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <Input
                      value={item.description}
                      readOnly
                      className="flex-1"
                    />
                    <Input value={item.price} readOnly className="w-24" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={newItem.price || ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-24"
                  />
                  <Button variant="outline" size="icon" onClick={handleAddItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </ScrollArea>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg">${calculateTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvoice}>Create Invoice</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
