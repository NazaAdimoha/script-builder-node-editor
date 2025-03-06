"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

import { Info } from "lucide-react";
import { InformationNode } from "@/types/node";
import { Textarea } from "../ui/text-area";

interface InformationNodeFormProps {
  node: InformationNode;
  onUpdate: (node: InformationNode) => void;
  showValidation: boolean;
}

const InformationNodeForm: React.FC<InformationNodeFormProps> = ({
  node,
  onUpdate,
  showValidation,
}) => {
  const [message, setMessage] = useState<string>(node.data.message);
  const isValid = message.trim().length > 0;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    onUpdate({
      ...node,
      data: {
        ...node.data,
        message: newMessage,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-green-600">
        <Info className="h-5 w-5" />
        <h3 className="text-lg font-medium">Information Message</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="info-message" className="text-sm text-gray-600">
          Message Text
        </Label>
        <Textarea
          id="info-message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your information message here..."
          className={`min-h-[120px] ${
            !isValid && showValidation
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
        />
        {!isValid && showValidation && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-red-500 mt-1"
          >
            Information message is required
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          This information will be presented to the customer during the
          conversation.
        </p>
      </div>
    </motion.div>
  );
};

export default InformationNodeForm;
