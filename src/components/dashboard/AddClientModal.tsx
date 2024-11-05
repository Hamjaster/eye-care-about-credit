import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Calendar, ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { GetCountries, GetState } from "react-country-state-city";
import DateSelector from "../ui/dateSelector";
import { ClientType } from "@/lib/type";

export default function AddClientModal({
  open,
  onClose,
  setClients,
}: {
  open: boolean;
  onClose: any;
  setClients: any;
}) {
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [countryId, setCountryId] = useState(233);
  const [passGenerated, setPassGenerated] = useState(false);
  const [passCopied, setPassCopied] = useState(false);
  // Form State
  const [formData, setFormData] = useState<ClientType>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    suffix: "",
    ssn: "",
    dob: null,
    mailingAddress: "",
    country: "United States",
    city: "",
    state: "",
    zipCode: "",
    phoneMobile: "",
    phoneAlternate: "",
    fax: "",
    status: "",
    startDate: null,
    assignedTo: "",
    referredBy: "",
    added: new Date(),
    password: "",
  });

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountriesList(result);
    });

    GetState(233).then((result: any) => {
      setStateList(result);
    });
  }, []);

  // Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle Form Submission
  const handleAddClient = () => {
    setClients((clients: ClientType[]) => [...clients, formData]);
    console.log(formData, "FORM DATA");
    // Clear form after submission
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      suffix: "",
      ssn: "",
      dob: null,
      mailingAddress: "",
      country: "United States",
      city: "",
      state: "",
      zipCode: "",
      phoneMobile: "",
      phoneAlternate: "",
      fax: "",
      status: "",
      startDate: null,
      assignedTo: "",
      referredBy: "",
      added: new Date(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-2xl font-semibold leading-6 text-gray-900"
          >
            Add Lead / Client
          </Dialog.Title>
          <div className="mt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Password</Label>
                  <div className="flex flex-row items-center justify-between space-x-3">
                    <Input
                      id="email"
                      type="email"
                      value={formData.password}
                      disabled
                    />
                    <Button
                      type="button"
                      onClick={async () => {
                        if (passGenerated && formData.password) {
                          await navigator.clipboard.writeText(
                            "http://localhost:5173/client-portal"
                          );
                          setPassCopied(true);
                        } else {
                          setFormData((formData) => {
                            return {
                              ...formData,
                              password: `${formData.firstName}543354@`,
                            };
                          });
                          setPassGenerated(true);
                        }
                      }}
                      className="w-min transition-all text-xs"
                    >
                      {passGenerated
                        ? passCopied
                          ? "Copied"
                          : "Copy Portal Link"
                        : "Generate Pass"}{" "}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input
                    id="suffix"
                    value={formData.suffix}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex space-x-3 flex-row justify-between">
                  <div>
                    <Label htmlFor="ssn">Last 4 of SSN</Label>
                    <Input
                      id="ssn"
                      maxLength={4}
                      value={formData.ssn}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date Of Birth</Label>
                    <DateSelector
                      value={formData.dob}
                      onChange={(value) =>
                        setFormData({ ...formData, dob: value })
                      }
                      text="DOB"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mailingAddress">Mailing Address</Label>
                  <Input
                    id="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    disabled
                    value={formData.country}
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    {countriesList.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    {stateList.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneMobile">Phone (Mobile)</Label>
                  <Input
                    id="phoneMobile"
                    type="tel"
                    value={formData.phoneMobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneAlternate">Phone (Alternate)</Label>
                  <Input
                    id="phoneAlternate"
                    type="tel"
                    value={formData.phoneAlternate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="fax">Fax</Label>
                  <Input
                    id="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <DateSelector
                  value={formData.startDate}
                  onChange={(value) =>
                    setFormData({ ...formData, startDate: value })
                  }
                  text="Start Date"
                />
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, assignedTo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assigned To" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carlos">Carlos</SelectItem>
                    <SelectItem value="John">John</SelectItem>
                    <SelectItem value="Hamza">Hamza</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, referredBy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Referred By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carlos">Carlos</SelectItem>
                    <SelectItem value="John">John</SelectItem>
                    <SelectItem value="Hamza">Hamza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleAddClient}>Add Lead/Client</Button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
