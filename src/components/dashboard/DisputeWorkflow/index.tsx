import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { DisputeItem } from "@/lib/type";
import { useAppDispatch } from "@/store/redux";
import { addDisputeItems } from "@/store/features/disputeWizardFeature/disputeWizardSlice";

const saveddisputeItems: DisputeItem[] = [
  {
    id: "1",
    creditor: "ABC Bank",
    accountNumbers: {
      equifax: "EQ123456",
      experian: "EX654321",
      transunion: "TU789012",
    },
    bureaus: ["Equifax", "Experian", "TransUnion"],
    reason: "Account shows incorrect balance",
    instruction: "Please verify the balance with the creditor.",
  },
  {
    id: "2",
    creditor: "XYZ Loans",
    accountNumbers: {
      equifax: "EQ223344",
      transunion: "TU998877",
    },
    bureaus: ["Equifax", "TransUnion"],
    reason: "Duplicate account listed",
    instruction: "Please remove duplicate entries.",
  },
  {
    id: "3",
    creditor: "Global Credit Union",
    accountNumbers: {
      experian: "EX102938",
    },
    bureaus: ["Experian"],
    reason: "Incorrect payment history",
    instruction: "Update payment history as per attached records.",
  },
  {
    id: "4",
    creditor: "LMN Credit Services",
    accountNumbers: {
      equifax: "EQ567890",
      experian: "EX456789",
    },
    bureaus: ["Equifax", "Experian"],
    reason: "Closed account still reported as open",
    instruction: "Verify and mark the account as closed.",
  },
  {
    id: "5",
    creditor: "QuickCash",
    accountNumbers: {
      transunion: "TU987654",
    },
    bureaus: ["TransUnion"],
    reason: "Incorrect account type",
    instruction: "Change account type to 'Installment Loan'.",
  },
];

export default function DisputeWorkflow() {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<DisputeItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [savedDisputeOpen, setSavedDisputeOpen] = React.useState(false);
  const [selectedBureaus, setSelectedBureaus] = React.useState<string[]>([]);
  const [accountNumberType, setAccountNumberType] = React.useState("same");
  const [accountNumbers, setAccountNumbers] = React.useState({
    same: "",
    equifax: "",
    experian: "",
    transunion: "",
  });
  const [selectedCreditor, setSelectedCreditor] = React.useState("");
  const [selectedReason, setSelectedReason] = React.useState("");
  const [selectedInstruction, setSelectedInstruction] = React.useState("");
  const dispatch = useAppDispatch();

  const handleSave = () => {
    const newItem: DisputeItem = {
      id: Math.random().toString(36).substr(2, 9),
      creditor: selectedCreditor,
      accountNumbers:
        accountNumberType === "same"
          ? {
              equifax: accountNumbers.same,
              experian: accountNumbers.same,
              transunion: accountNumbers.same,
            }
          : {
              equifax: accountNumbers.equifax,
              experian: accountNumbers.experian,
              transunion: accountNumbers.transunion,
            },
      bureaus: selectedBureaus,
      reason: selectedReason,
      instruction: selectedInstruction,
    };
    setItems([...items, newItem]);
    dispatch(addDisputeItems([...items, newItem]));
    setOpen(false);
    resetForm();
  };

  const addDisputeItem = (disputeData: DisputeItem) => {
    setItems([...items, disputeData]);
    dispatch(addDisputeItems([...items, disputeData]));
    setSavedDisputeOpen(false);
  };

  const resetForm = () => {
    setSelectedBureaus([]);
    setAccountNumberType("same");
    setAccountNumbers({
      same: "",
      equifax: "",
      experian: "",
      transunion: "",
    });
    setSelectedCreditor("");
    setSelectedReason("");
    setSelectedInstruction("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold mb-2">Add Dispute Items</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Step 1 of 3</div>
            <Progress value={35} className="w-[100px]" />
          </div>
        </div>

        <p className="text-muted-foreground">
          To ensure your disputes are taken seriously and not rejected by the
          credit bureaus, we advise limiting the number of dispute items to 5
          per month per bureau (unless it involves identity theft with a police
          report).
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant="default"
          onClick={() => setSavedDisputeOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Saved Dispute Item
        </Button>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Dispute Item
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Creditor/Furnisher</TableHead>
            <TableHead>Account #</TableHead>
            <TableHead>Dispute Items</TableHead>
            <TableHead className="text-right">Credit Bureaus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No dispute items added
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.creditor}</TableCell>
                <TableCell>{Object.values(item.accountNumbers)[0]}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row justify-end space-x-4">
                    {item.bureaus.map((bureau) => (
                      <img
                        src={
                          bureau === "Equifax"
                            ? "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                            : bureau === "Experian"
                            ? "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                            : "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                        }
                        className="w-16"
                        alt=""
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-4 mt-6">
       
        <Button
          onClick={() => navigate("/dashboard/client-credit/dispute/letter")}
          variant="outline"
        >
          Add Letters
        </Button>
      </div>
      {/* Adding dispute item dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Dispute Item</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[600px] pr-4">
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Select Credit Bureaus *</Label>
                <div className="space-y-2">
                  {["Equifax", "Experian", "TransUnion"].map((bureau) => (
                    <div key={bureau} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedBureaus.includes(bureau)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBureaus([...selectedBureaus, bureau]);
                          } else {
                            setSelectedBureaus(
                              selectedBureaus.filter((b) => b !== bureau)
                            );
                          }
                        }}
                      />
                      <Label>
                        <img
                          src={
                            bureau === "Equifax"
                              ? "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                              : bureau === "Experian"
                              ? "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                              : "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                          }
                          className="w-24"
                          alt=""
                        />
                        {/* {bureau} */}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Account Number (Optional)</Label>
                <RadioGroup
                  value={accountNumberType}
                  onValueChange={setAccountNumberType}
                  className="mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="same" id="same" />
                    <Label htmlFor="same">Same for all bureaus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="different" id="different" />
                    <Label htmlFor="different">Different for each bureau</Label>
                  </div>
                </RadioGroup>

                {accountNumberType === "same" ? (
                  <Input
                    placeholder="Enter account number"
                    value={accountNumbers.same}
                    onChange={(e) =>
                      setAccountNumbers({
                        ...accountNumbers,
                        same: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {selectedBureaus.map((bureau) => (
                      <div key={bureau}>
                        <Label className="mb-1 block">{bureau}</Label>
                        <Input
                          placeholder={`Enter ${bureau} account number`}
                          value={
                            accountNumbers[
                              bureau.toLowerCase() as keyof typeof accountNumbers
                            ]
                          }
                          onChange={(e) =>
                            setAccountNumbers({
                              ...accountNumbers,
                              [bureau.toLowerCase()]: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Creditor/Furnisher</Label>
                  <Select
                    value={selectedCreditor}
                    onValueChange={setSelectedCreditor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Search a Creditor/Furnisher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank1">Bank of America</SelectItem>
                      <SelectItem value="bank2">Chase</SelectItem>
                      <SelectItem value="bank3">Wells Fargo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Reason *</Label>
                  <Select
                    value={selectedReason}
                    onValueChange={setSelectedReason}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason for your dispute" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not my account">
                        Not my account
                      </SelectItem>
                      <SelectItem value="Incorrect balance">
                        Incorrect balance
                      </SelectItem>
                      <SelectItem value="Account closed">
                        Account closed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Instruction</Label>
                  <Select
                    value={selectedInstruction}
                    onValueChange={setSelectedInstruction}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose instructions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instruction1">
                        Please correct/update this inaccurate information on my
                        credit report.
                      </SelectItem>
                      <SelectItem value="instruction2">
                        Please remove this inaccurate information from my credit
                        report.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Adding save dispute items */}
      <Dialog open={savedDisputeOpen} onOpenChange={setSavedDisputeOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Dispute Item</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-4xl pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creditor/Furnisher</TableHead>
                  <TableHead>Account #</TableHead>
                  <TableHead>Dispute Items</TableHead>
                  <TableHead className="text-right">Credit Bureaus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saveddisputeItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No dispute items saved
                    </TableCell>
                  </TableRow>
                ) : (
                  saveddisputeItems.map((item) => (
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => addDisputeItem(item)}
                      key={item.id}
                    >
                      <TableCell>{item.creditor}</TableCell>
                      <TableCell>
                        {Object.values(item.accountNumbers)[0]}
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-row justify-end space-x-4">
                          {item.bureaus.map((bureau) => (
                            <img
                              src={
                                bureau === "Equifax"
                                  ? "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                                  : bureau === "Experian"
                                  ? "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                                  : "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                              }
                              className="w-16"
                              alt=""
                            />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
