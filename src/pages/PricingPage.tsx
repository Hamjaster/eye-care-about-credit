import { useState } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const pricingPlans = [
  {
    name: "Basic plan",
    description: "Best for small teams and freelancers.",
    price: 10,
    features: [
      "Basic features",
      "10 Users",
      "20GB Individual data",
      "Support",
      "Automated workflows",
      "200+ integrations",
    ],
  },
  {
    name: "Business plan",
    description: "Best for growing teams.",
    price: 20,
    features: [
      "Basic features",
      "20 Users",
      "40GB Individual data",
      "Support",
      "Automated workflows",
      "200+ integrations",
    ],
  },
  {
    name: "Enterprise plan",
    description: "Best for large organizations.",
    price: 40,
    features: [
      "Basic features",
      "Unlimited Users",
      "Unlimited Individual data",
      "Support",
      "Automated workflows",
      "200+ integrations",
    ],
  },
];

const featuresList = [
  "Basic features",
  "Users",
  "Individual data",
  "Support",
  "Automated workflows",
  "200+ integrations",
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
        <h2 className="text-4xl font-bold text-center mb-2">Pricing plans</h2>
        <p className="text-center text-gray-600 mb-8">
          Try our basic plan risk free for 30 days. Switch plans or cancel any
          time.
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative bg-red-100 w-1/3 rounded-full p-1">
            <button
              className={`${
                isAnnual ? "bg-white shadow-sm" : ""
              } relative w-1/2 py-2 px-4 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-websitePrimary`}
              onClick={() => setIsAnnual(true)}
            >
              Annual pricing
            </button>
            <button
              className={`${
                !isAnnual ? "bg-white shadow-sm" : ""
              } relative w-1/2 py-2 px-4 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-websitePrimary`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly pricing
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="bg-red-50 rounded-lg p-8 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-4xl text-websitePrimary font-bold mb-4">
                ${isAnnual ? plan.price * 12 : plan.price}
                <span className="text-base font-normal text-red-900">
                  {isAnnual ? "/year" : "/month"}
                </span>
              </div>
              <button className="primary-btn py-2 px-4 rounded-md mb-4  transition-colors">
                {plan.name === "Basic plan"
                  ? "Start free trial"
                  : "Get started"}
              </button>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">Features</th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className="text-left py-4 px-4 font-semibold"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuresList.map((feature, index) => (
                <tr
                  key={feature}
                  className={index % 2 === 0 ? "bg-red-50" : ""}
                >
                  <td className="py-4 px-4">{feature}</td>
                  {pricingPlans.map((plan) => (
                    <td key={`${plan.name}-${feature}`} className="py-4 px-4">
                      {feature === "Users" || feature === "Individual data" ? (
                        plan.features[index]
                      ) : plan.features.includes(feature) ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <MinusIcon className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
