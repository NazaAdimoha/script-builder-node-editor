"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { NodeType, Node } from "@/types/node";
import GreetingNodeForm from "./greeting-node-form";
import QuestionNodeForm from "./question-node-form";
import InformationNodeForm from "./information-node";

interface PropertiesPanelProps {
  node: Node;
  onUpdate: (node: Node) => void;
  onSave: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  node,
  onUpdate,
  onSave,
}) => {
  const [showValidation, setShowValidation] = useState(false);

  const isNodeValid = () => {
    switch (node.type) {
      case NodeType.GREETING:
        return node.data.message.trim().length > 0;
      case NodeType.QUESTION:
        return (
          node.data.question.trim().length > 0 &&
          node.data.options.length >= 2 &&
          node.data.options.every((opt) => opt.trim().length > 0)
        );
      case NodeType.INFORMATION:
        return node.data.message.trim().length > 0;
      default:
        return false;
    }
  };

  const handleSave = () => {
    if (isNodeValid()) {
      onSave();
      setShowValidation(false);
    } else {
      setShowValidation(true);
    }
  };

  const renderForm = () => {
    switch (node.type) {
      case NodeType.GREETING:
        return (
          <GreetingNodeForm
            node={node as any}
            onUpdate={onUpdate as any}
            showValidation={showValidation}
          />
        );
      case NodeType.QUESTION:
        return (
          <QuestionNodeForm
            node={node as any}
            onUpdate={onUpdate as any}
            showValidation={showValidation}
          />
        );
      case NodeType.INFORMATION:
        return (
          <InformationNodeForm
            node={node as any}
            onUpdate={onUpdate as any}
            showValidation={showValidation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="bg-gray-50 border-b p-4">
        <h2 className="text-lg font-medium">Node Properties</h2>
        <p className="text-sm text-gray-500">
          Configure the node settings below
        </p>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={node.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 flex justify-end"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Node
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PropertiesPanel;
