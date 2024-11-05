"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, FileText, Upload, AlertCircle } from "lucide-react";
import AttachSpecificDocuments from "./AttachSpecificDocuments";
import PreviewLetters from "./PreviewLetters";
import { LetterType } from "@/lib/type";
import { useAppDispatch } from "@/store/redux";
import {
  addSelectedLetter,
  removeSelectedLetter,
} from "@/store/features/disputeWizardFeature/disputeWizardSlice";

export default function SendLetter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [documents, setDocuments] = useState({
    photoId: null,
    proofOfAddress: null,
  });
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const dispatch = useAppDispatch();
  const letters: LetterType[] = [
    {
      id: "1",
      title: "EXD1",
      status: "Active",
      category: "Introduction",
      description:
        "A letter welcoming the new client and introducing our services.",
    },
    {
      id: "2",
      title: "RS-D1",
      status: "Inactive",
      category: "Follow-up",
      description: "A reminder for upcoming appointments or due payments.",
    },
    {
      id: "3",
      title: "RS-D3",
      status: "Active",
      category: "Appreciation",
      description:
        "A letter expressing gratitude to a client for their business.",
    },
  ];

  const handleFileUpload = (type: "photoId" | "proofOfAddress", file: File) => {
    setDocuments((prev) => ({ ...prev, [type]: file }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Select Letters ({selectedLetters.length} Selected)
                </h3>
                <p className="text-sm text-muted-foreground">
                  This is a list of all unsent and unprinted letters that you
                  have created for this client.
                </p>
              </div>
            </div>
            <div className="border-red-200 border rounded-lg">
              <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium">
                <div>Letter To</div>
                <div>Created</div>
                <div>Print Status</div>
                <div>Category</div>
                <div>Actions</div>
              </div>
              {letters.map((letter) => (
                <div
                  key={letter.title}
                  className="grid grid-cols-5 gap-4 p-4 border-t border-red-200 items-center"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedLetters.includes(letter.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLetters((prev) => [...prev, letter.id]);
                          dispatch(addSelectedLetter(letter));
                        } else {
                          setSelectedLetters((prev) =>
                            prev.filter((id) => id !== letter.id)
                          );
                          dispatch(removeSelectedLetter(letter.id));
                        }
                      }}
                    />
                    {letter.title}
                  </div>
                  <div>9/11/2022</div>
                  <div>{letter.status}</div>
                  <div>{letter.category}</div>
                  <Button variant="outline" size="sm">
                    View/Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Attach Documents</h3>
              <p className="text-sm text-muted-foreground">
                Photo ID and Proof of Address are mandatory attachments
              </p>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {documents.photoId ? (
                        <Check className="text-green-500" />
                      ) : null}
                      <span>Photo ID</span>
                    </div>
                    <Input
                      type="file"
                      className="w-[200px]"
                      onChange={(e) =>
                        handleFileUpload("photoId", e.target.files?.[0])
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {documents.proofOfAddress ? (
                        <Check className="text-green-500" />
                      ) : null}
                      <span>Proof of Address</span>
                    </div>
                    <Input
                      type="file"
                      className="w-[200px]"
                      onChange={(e) =>
                        handleFileUpload("proofOfAddress", e.target.files?.[0])
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <AttachSpecificDocuments />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Select Print & Mail Methods</h3>
              <p className="text-sm text-muted-foreground">
                Select an automated delivery method or choose to print at home
              </p>
            </div>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
            >
              <div className="grid grid-cols-3 gap-4">
                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="first-class" id="first-class" />
                      <Label htmlFor="first-class">First Class Mail</Label>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">Est. Delivery Date</p>
                      <p className="font-medium">Nov. 04 - Nov. 06</p>
                      <p className="text-sm text-green-600">
                        Starting at $1.01
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="certified" id="certified" />
                      <Label htmlFor="certified">Certified Mail</Label>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">Est. Delivery Date</p>
                      <p className="font-medium">Nov. 04 - Nov. 06</p>
                      <p className="text-sm text-green-600">
                        Starting at $6.64
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local">Print & Mail Locally</Label>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Print at home or office and mail your letters from your
                      local USPS
                    </p>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </div>
        );
      case 4:
        return <PreviewLetters />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Send Letters (David Daughrity)</h2>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 border-2  border-websitePrimaryLight rounded-full flex items-center justify-center ${
                    step === currentStep
                      ? "bg-websitePrimary text-primary-foreground"
                      : step < currentStep
                      ? "bg-websitePrimary/20"
                      : "bg-muted/20 "
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-20 h-0.5 ${
                      step < currentStep ? "bg-websitePrimary/20" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            disabled={
              currentStep === 4 ||
              (currentStep === 1 && selectedLetters.length === 0) ||
              (currentStep === 2 &&
                (!documents.photoId || !documents.proofOfAddress)) ||
              (currentStep === 3 && !deliveryMethod)
            }
          >
            {currentStep === 3 ? "Preview & Send" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
