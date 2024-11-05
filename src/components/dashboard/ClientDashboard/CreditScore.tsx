import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import CreditScoreChart from "../CreditScoreChart";
import { ClientType } from "../Clients";
import ImportCredit from "../ImportCreditReportModal";

export default function CreditScore({ client }: { client: ClientType }) {
  const [importAuditModal, setImportAuditModal] = useState(false);
  return (
    <div>
      {" "}
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            <h2 className=" font-bold">Hello, {client.firstName}</h2>
            <p className="font-normal">Here is your credit rate 🙂</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-1 text-xs mb-4">
            <span className="cursor-pointer hover:bg-white transition border px-4 py-2 rounded-2xl">
              TransUnion
            </span>
            <span className="cursor-pointer hover:bg-white transition border px-4 py-2 rounded-2xl">
              Equifax
            </span>
            <span className="cursor-pointer hover:bg-white transition border px-4 py-2 rounded-2xl">
              Experian
            </span>
          </div>
          <div className="mt-8">
            <CreditScoreChart score={500} />
          </div>
          <div className="w-full flex items-center justify-center mt-5 mb-3">
            <Button
              onClick={() => setImportAuditModal(true)}
              className="px-6 text-xs mx-auto self-center py-5 rounded-2xl "
            >
              Update your credit score
            </Button>
          </div>
        </CardContent>
      </Card>
      {importAuditModal && (
        <ImportCredit
          setModal={setImportAuditModal}
          isOpen={importAuditModal}
        />
      )}
    </div>
  );
}
