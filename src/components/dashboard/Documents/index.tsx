"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Printer,
  Folder,
  CheckSquare,
  MessageSquare,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const timelineItems = [
  { icon: FileText, text: "Progress", link: "progress" },
  // { icon: Printer, text: "First Work Pending" },
  { icon: Folder, text: "All Files", link: "files" },
  { icon: CheckSquare, text: "All Tasks", link: "tasks" },
  // { icon: MessageSquare, text: "All Communication" },
  // { icon: Mail, text: "All CloudMail Sent" },
];

export default function Documents() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div className=" mt-14  flex items-center justify-center ">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">
          Here's everything that's been happening at Ameco Capital Inc
        </h1>
        <div className="relative">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center mb-8 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`w-16 h-16  rounded-full bg-red-100 flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 1000, damping: 15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <item.icon className="w-8 transition-all  h-8 text-red-400" />
              </motion.div>
              <motion.div
                onClick={() => navigate(`/dashboard/documents/${item.link}`)}
                className="ml-4 bg-white cursor-pointer rounded-lg p-4 shadow-md flex-grow"
              >
                <h2 className="text-xl font-semibold">{item.text}</h2>
                {hoveredIndex === index && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 mt-2"
                  >
                    Click to view details about {item.text.toLowerCase()}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          ))}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-300 z-0" />
        </div>
      </div>
    </div>
  );
}
