"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LetterType } from "@/lib/type";
import { useAppSelector } from "@/store/redux";
import { useReactToPrint } from "react-to-print";

// Type for a letter
type Letter = {
  id: string;
  text: string;
};

export default function PreviewLetters() {
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>("1");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { selectedLetters } = useAppSelector((state) => state.currentDispute);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const openDialog = (id: string) => {
    setSelectedLetterId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedLetterId(null);
  };

  const currentLetterIndex = selectedLetterId
    ? selectedLetters.findIndex((l) => l.id === selectedLetterId)
    : -1;
  const currentLetter =
    currentLetterIndex !== -1 ? selectedLetters[currentLetterIndex] : null;

  const goToNextLetter = () => {
    const nextIndex = (currentLetterIndex + 1) % letters.length;
    setSelectedLetterId(letters[nextIndex].id);
  };

  const goToPreviousLetter = () => {
    const previousIndex =
      (currentLetterIndex - 1 + letters.length) % letters.length;
    setSelectedLetterId(letters[previousIndex].id);
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Letter Preview</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          variant="outline"
          onClick={() => openDialog(selectedLetters[0].id)}
        >
          Preview Letters
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Letter Preview</DialogTitle>
          </DialogHeader>
          <ScrollArea
            ref={contentRef}
            className="h-[600px] w-full rounded-md border p-4"
          >
            {currentLetter?.description && (
              <div className="bg-white ">{currentLetter.description}</div>
            )}
          </ScrollArea>
          <div className="flex justify-between mt-4">
            <div className="flex items-center justify-between space-x-3">
              <Button
                variant="outline"
                onClick={goToPreviousLetter}
                disabled={selectedLetters.length <= 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={goToNextLetter}
                disabled={selectedLetters.length <= 1}
              >
                Next <ChevronRight className="ml-2 h-5 w-4" />
              </Button>
            </div>
            <Button
              onClick={reactToPrintFn}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
