import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

      <Card className="bg-gray-50 border-red-200">
        <CardContent className="p-4 flex items-start space-x-4">
          <svg
            className="w-6 h-6 text-red-500 mt-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
                <Button variant="link" className="text-red-600">
                  Change Plan
                </Button>
                <span className="mx-2">|</span>
                <Button variant="link" className="text-red-600">
                  View Receipts
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Start Plan</h3>
              <p className="text-sm text-gray-600">Full-access</p>
              <p className="text-2xl font-bold">
                $179<span className="text-sm font-normal">/Month</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your next charge is $179 on Nov 25, 2024
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Usage & Add-ons
              </h2>
              <Button variant="link" className="text-red-600">
                (Manage Add-ons)
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead>Purchased</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell>3 of 3</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Client Slots</TableCell>
                  <TableCell>42 of 300</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Billing Information
            </h2>
            <p className="mb-2">The following card on file will be charged</p>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-md">
              <div className="flex-1">**** **** **** 6681</div>
              <div>5/2029</div>
              <Button variant="link" className="text-red-600">
                Change card
              </Button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              You are the account owner
            </h2>
            <Button variant="link" className="text-red-600 p-0 h-auto">
              Transfer account ownership to another team member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
