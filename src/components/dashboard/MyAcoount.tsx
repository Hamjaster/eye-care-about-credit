"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, CreditCard } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard as CardIcon,
  CircleDollarSign,
  Info,
  Rocket,
} from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: 99,
    features: ["1 team member", "100GB storage", "100 clients", "Basic portal"],
  },
  {
    name: "Start Plan",
    price: 179,
    features: [
      "3 team members",
      "Unlimited storage",
      "300 clients",
      "Full portal",
    ],
  },
  {
    name: "Scale Plan",
    price: 299,
    features: [
      "10 team members",
      "Unlimited storage",
      "1000 clients",
      "Premium portal",
    ],
  },
];

const cardFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  cardNumber: z
    .string()
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Invalid expiry date"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
});

export default function AccountPage() {
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [cardDetails, setCardDetails] = useState({
    number: "**** **** **** 6681",
    expiry: "5/2029",
  });

  const form = useForm({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  });

  const onSubmitCard = (data: any) => {
    // In a real app, you would send this to your backend
    setCardDetails({
      number: "**** **** **** " + data.cardNumber.slice(-4),
      expiry: data.expiry,
    });
    setIsCardDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

      <Card className="bg-gray-50 border-red-200">
        <CardContent className="p-4 flex items-start space-x-4">
          <Info className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-800">
              This page shows your account status. You're the sole account
              owner. Your master email for billing and support is:{" "}
              <span className="font-semibold">amecocapitalinc@gmail.com</span>
            </p>
            <Button variant="link" className="text-red-600 p-0 h-auto">
              (Change)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Current Plan Details
              </h2>
              <div>
                <Button
                  variant="link"
                  className="text-red-600"
                  onClick={() => setIsPlanDialogOpen(true)}
                >
                  Change Plan
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{selectedPlan.name}</h3>
              <p className="text-sm text-gray-600">Full-access</p>
              <p className="text-2xl font-bold">
                ${selectedPlan.price}
                <span className="text-sm font-normal">/Month</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your next charge is ${selectedPlan.price} on Nov 25, 2024
              <br />
              Your available credit amount is $0
            </p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">
                    Number of team member (users) allowed:
                  </TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Data storage included:
                  </TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Number of clients included:
                  </TableCell>
                  <TableCell>300</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Number of affiliates included:
                  </TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Client and affiliate portal:
                  </TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-red-600 mt-4">
              (Save $429.60 on yearly plan)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Billing Information
            </h2>
            <p className="mb-2">The following card on file will be charged</p>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-md">
              <div className="flex-1">{cardDetails.number}</div>
              <div>{cardDetails.expiry}</div>
              <Button
                variant="link"
                className="text-red-600"
                onClick={() => setIsCardDialogOpen(true)}
              >
                Change card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Change Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              Choose the plan that best fits your needs
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`cursor-pointer transition-all ${
                  selectedPlan.name === plan.name
                    ? "border-red-500 shadow-lg"
                    : "hover:border-red-200"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {selectedPlan.name === plan.name && (
                      <Check className="text-red-500 h-5 w-5" />
                    )}
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    ${plan.price}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm flex items-center gap-2"
                      >
                        <Check className="h-4 w-4 text-gray-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPlanDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, you would send this to your backend
                setIsPlanDialogOpen(false);
              }}
            >
              Confirm Change
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Change Dialog */}
      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Credit Card Details</DialogTitle>
            <DialogDescription>
              Enter your new card information below
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCard)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0000-0000-0000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCardDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Card</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
102;
