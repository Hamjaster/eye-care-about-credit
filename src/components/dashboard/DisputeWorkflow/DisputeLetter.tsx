import * as React from "react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link as LinkIcon,
  Image,
  Plus,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Editor, type EditorType } from "@/components/ui/editor";
import { cn } from "@/lib/utils";
import { useActionData, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store/redux";

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface LetterContent {
  accountNumber: string;
  content: string;
}

interface CreditBureau {
  name: string;
  logo: string;
  address: Address;
  letterContent: LetterContent;
}

const DATA: CreditBureau[] = [
  {
    name: "Equifax",
    logo: "/equifax-logo.svg",
    address: {
      name: "Equifax Information Services LLC",
      street: "P.O. Box 740256",
      city: "Atlanta",
      state: "GA",
      zip: "30374",
    },
    letterContent: {
      accountNumber: "",
      content:
        "Please correct/update this inaccurate information on my credit report.",
    },
  },
  {
    name: "Experian",
    logo: "/experian-logo.svg",
    address: {
      name: "Experian",
      street: "P.O. Box 4500",
      city: "Allen",
      state: "TX",
      zip: "75013",
    },
    letterContent: {
      accountNumber: "",
      content:
        "Please correct/update this inaccurate information on my credit report.",
    },
  },
  {
    name: "TransUnion",
    logo: "/transunion-logo.svg",
    address: {
      name: "TransUnion LLC Consumer Dispute Center",
      street: "P.O Box 2000",
      city: "Chester",
      state: "PA",
      zip: "19016",
    },
    letterContent: {
      accountNumber: "",
      content:
        "Please correct/update this inaccurate information on my credit report.",
    },
  },
];

export default function DisputeLetter() {
  const [activeTab, setActiveTab] = React.useState("equifax");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const [senderAddress, setSenderAddress] = React.useState<Address>({
    name: "David Daughrity",
    street: "643 41st St",
    city: "West Palm Beach",
    state: "Florida",
    zip: "33407",
  });
  const [bureaus, setBureaus] = React.useState(DATA);
  const { letters } = useAppSelector((state) => state.letters);
  const formatAddress = (address: Address) => {
    return (
      <>
        {address.name}
        <br />
        {address.street}
        <br />
        {address.city}, {address.state} {address.zip}
      </>
    );
  };

  const toolbarItems = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: AlignLeft, label: "Align left" },
    { icon: AlignCenter, label: "Align center" },
    { icon: AlignRight, label: "Align right" },
    { icon: List, label: "Bullet list" },
    { icon: LinkIcon, label: "Insert link" },
    { icon: Image, label: "Insert image" },
    { icon: Plus, label: "Insert more" },
  ];

  const handleEditorChange = (content: string, index: number) => {
    setBureaus((prevBureaus) =>
      prevBureaus.map((bureau, i) =>
        i === index
          ? { ...bureau, letterContent: { ...bureau.letterContent, content } }
          : bureau
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            Letter Editor (David Arthur)
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Step 2 of 3</div>
            <Progress value={65} className="w-[100px]" />
          </div>
        </div>

        <Tabs
          className="rounded-none"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mx-0 -ml-1 space-x-2">
            {bureaus.map((bureau) => (
              <TabsTrigger
                className="px-2 py-3 rounded-none border "
                key={bureau.name.toLowerCase()}
                value={bureau.name.toLowerCase()}
              >
                <div className="w-28 h-5 flex items-center justify-center">
                  {bureau.name === "Equifax" ? (
                    <img
                      src={
                        "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                      }
                      className="w-20"
                      alt=""
                    />
                  ) : bureau.name === "Experian" ? (
                    <img
                      src={
                        "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                      }
                      className="w-20"
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                      }
                      className="w-24"
                      alt=""
                    />
                  )}
                </div>
              </TabsTrigger>
            ))}
            {/* <TabsTrigger value="client-docs">Client Docs</TabsTrigger> */}
          </TabsList>

          {bureaus.map((bureau, i) => (
            <TabsContent
              className="rounded-none"
              key={bureau.name.toLowerCase()}
              value={bureau.name.toLowerCase()}
            >
              <Card className="rounded-none shadow-none">
                <CardContent className="p-6">
                  <div className="mb-2">
                    <h3 className="text-sm text-gray-400 font-medium mb-2">
                      Letter envelope information (Only for CloudMail)
                    </h3>
                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div>
                        <div className="text-sm font-semibold mb-1">
                          Send From Address:
                        </div>
                        <div className="text-sm">
                          {formatAddress(senderAddress)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-1">
                          Send To Address:
                        </div>
                        <div className="text-sm">
                          {formatAddress(bureau.address)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <Editor
                      setValue={(newValue: any) => {
                        console.log(newValue, "hy");
                        handleEditorChange(newValue, i);
                      }}
                      value={bureau.letterContent.content}
                      defaultValue={`Account Number: ${bureau.letterContent.accountNumber}\n\n${bureau.letterContent.content}`}
                      className="h-full"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <Button
                      onClick={() =>
                        navigate("/dashboard/client-credit/dispute/letter/send")
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save & Continue to Print
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                      Add From Saved Letters
                    </Button>
                  </div>

                  {/* Adding save dispute items */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Select From Letter Library</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-4xl pr-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {letters.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={4}
                                  className="text-center text-muted-foreground"
                                >
                                  No dispute items saved
                                </TableCell>
                              </TableRow>
                            ) : (
                              letters.map((item) => (
                                <TableRow
                                  className="cursor-pointer"
                                  onClick={() => {
                                    if (!item.description) return;
                                    handleEditorChange(item?.description, i);
                                    setIsModalOpen(false);
                                  }}
                                  key={item.title}
                                >
                                  <TableCell>{item.title}</TableCell>
                                  <TableCell>{item.category}</TableCell>
                                  <TableCell>{item.status}</TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="client-docs">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  Client documentation section
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
