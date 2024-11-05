"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function ImpoprtCreditRepoprt({
  isOpen,
  setModal,
}: {
  isOpen: boolean;
  setModal: any;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setModal()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Credit Report</DialogTitle>
          <DialogDescription>
            Import your credit report from a file or connect to a service
            provider.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Manual Upload</TabsTrigger>
            <TabsTrigger value="provider">Auto Import</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Credit Report File</Label>
                <Input id="file" type="file" accept=".html" />
              </div>
              <Button
                type="submit"
                className="bg-websitePrimary hover:bg-websitePrimaryDark w-full"
              >
                Import File
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="provider">
            <form className="space-y-4  py-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Choose Supported Provider *</Label>
                <Select>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="privacyguard">
                      PrivacyGuard (Not Recommended)
                    </SelectItem>
                    <SelectItem value="CreditHeroScore">
                      CreditHeroScore
                    </SelectItem>
                    <SelectItem value="IdentityIQ">IdentityIQ</SelectItem>
                    <SelectItem value="SmartCredit">SmartCredit</SelectItem>
                    <SelectItem value="MyScoreIQ">MyScoreIQ</SelectItem>
                    <SelectItem value="PrivacyGaurd">PrivacyGaurd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  (Case-sensitive)
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ssn">Last 4 Digits of Social Security #</Label>
                <Input
                  id="ssn"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  placeholder="####"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" />
              </div>
              <Button
                type="submit"
                className="bg-websitePrimary hover:bg-websitePrimaryDark w-full"
              >
                Import from Provider
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
