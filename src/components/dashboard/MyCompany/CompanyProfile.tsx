import React, { useEffect, useState } from "react";
import { ChevronDown, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { GetState } from "react-country-state-city";

export default function MyCompany() {
  const [stateList, setStateList] = useState<any[]>([]);
  useEffect(() => {
    GetState(233).then((result: any) => {
      setStateList(result);
    });
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Company Profile</h1>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <p className="text-websitePrimary">
          Please fill in all the details on this page, so the appropriate
          details will appear for your clients and affiliates.
        </p>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="companyName">Company Name*</Label>
            <Input id="companyName" defaultValue="Ameco Capital Inc" />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" defaultValue="https://amecocapital.com" />
          </div>
          <div>
            <Label htmlFor="timeZone">Time Zone</Label>
            <Select>
              <option>(GMT-5:00) Eastern Time</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="mailingAddress">Mailing Address*</Label>
            <Input id="mailingAddress" defaultValue="2965 Peachtree Rd" />
          </div>
          <div>
            <Label htmlFor="city">City*</Label>
            <Input id="city" defaultValue="Atlanta" />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none  appearance-none"
            >
              {stateList.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code*</Label>
            <Input id="zipCode" defaultValue="30305" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" defaultValue="United States" disabled />
          </div>
          <div>
            <Label htmlFor="phone">Phone*</Label>
            <Input id="phone" defaultValue="(470) 827-2901" />
          </div>
          <div>
            <Label htmlFor="fax">Fax</Label>
            <Input id="fax" />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Automated notifications are sent from the account holder's name and
            email address. Or you may designate a different name (or a company
            name) and email below for all notifications sent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="senderName">Sender Name</Label>
            <Input id="senderName" defaultValue="Carlos Corbin" />
          </div>
          <div>
            <Label htmlFor="senderEmail">Sender Email</Label>
            <Input id="senderEmail" defaultValue="amecocapitalinc@gmail.com" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="nameCompany">Name/Company</Label>
            <Input id="nameCompany" defaultValue="Ameco Capital Inc" />
            <p className="mt-1 text-sm text-gray-500">
              The name or company that your client invoices should be payable to
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" className="primary-btn w-44 ">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
