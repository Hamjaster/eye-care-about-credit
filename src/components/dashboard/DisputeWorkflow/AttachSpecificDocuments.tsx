"use client";

import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAppDispatch, useAppSelector } from "@/store/redux";
import { editSelectedLetters } from "@/store/features/disputeWizardFeature/disputeWizardSlice";

interface DocumentRow {
  id: string;
  letterTitle: string;
  attachedDocument: File | null;
}

export default function AttachSpecificDocuments() {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedLetters } = useAppSelector((state) => state.currentDispute);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const dispatch = useAppDispatch();
  const handleAttachEdit = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

  const handleFileChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    const updatedLetters = selectedLetters.map((doc) =>
      doc.id === id ? { ...doc, document: file } : doc
    );
    dispatch(editSelectedLetters(updatedLetters));
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="mb-4 flex items-center justify-between w-full p-4 bg-white rounded-md shadow-sm">
        <span className="text-base font-medium">
          + Attach Additional Documents
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-gray-50 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Letter Title</TableHead>
              <TableHead>Attached Documents</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedLetters.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.title}</TableCell>
                <TableCell>
                  {doc.document ? (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4" />
                      <span>{doc.document.name}</span>
                    </div>
                  ) : (
                    "..."
                  )}
                </TableCell>
                <TableCell>
                  <input
                    type="file"
                    className="hidden"
                    ref={(el) => (fileInputRefs.current[doc.id] = el)}
                    onChange={(e) => handleFileChange(doc.id, e)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAttachEdit(doc.id)}
                  >
                    {doc.document ? "Edit" : "Attach"} Document
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  );
}
