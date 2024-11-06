import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export default function AddLetterModal({
  open,
  onClose,
  setLetterData,
}: {
  open: boolean;
  onClose: any;
  setLetterData: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <DialogHeader className="text-2xl font-semibold leading-6 text-gray-900">
          Add Dispute Letter
        </DialogHeader>
        <div className="mt-6">
          <form className="space-y-4">
            <Textarea
              rows={15}
              placeholder="Enter the prompt for the letter "
            />

            <div className="flex justify-between space-x-4 mt-6">
              <Button
                className="float-start bg-gradient-to-r from-websitePrimaryLight via-blue-300 to-green-200 text-gray-900 font-semibold"
                variant={"outline"}
              >
                Generate with Ai
              </Button>

              <div className="space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>Add Letter</Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
