"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";
import { createNewNode, NodeType, Node } from "@/types/node";
import NodeTypeSelector from "./node-type-selector";
import NodePreview from "./node-preview";
import PropertiesPanel from "./properties-panel";

interface ToastState {
  open: boolean;
  title: string;
  description: string;
}

const NodeEditor: React.FC = () => {
  const [currentNodeType, setCurrentNodeType] = useState<NodeType>(
    NodeType.GREETING
  );
  const [currentNode, setCurrentNode] = useState<Node>(
    createNewNode(NodeType.GREETING)
  );
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: "",
    description: "",
  });

  useEffect(() => {
    setCurrentNode(createNewNode(currentNodeType));
  }, [currentNodeType]);

  const handleNodeTypeChange = (type: NodeType) => {
    setCurrentNodeType(type);
  };

  const handleNodeUpdate = (updatedNode: Node) => {
    setCurrentNode(updatedNode);
  };

  const handleSave = () => {
    console.log("Saving node:", currentNode);

    setToast({
      open: true,
      title: "Node Saved",
      description: `The ${currentNodeType} node has been saved successfully.`,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-caantin-800">
          Caantin AI Script Builder
        </h1>
        <p className="text-gray-600 mt-2">
          Create and edit voice conversation nodes for your AI script
        </p>
      </motion.div>

      <NodeTypeSelector
        currentType={currentNodeType}
        onTypeChange={handleNodeTypeChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div layout className="md:order-2">
          <NodePreview node={currentNode} />
        </motion.div>

        <motion.div layout className="md:order-1">
          <PropertiesPanel
            node={currentNode}
            onUpdate={handleNodeUpdate}
            onSave={handleSave}
          />
        </motion.div>
      </div>

      <ToastProvider>
        <AnimatePresence>
          {toast.open && (
            <Toast variant="success">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <div>
                  <ToastTitle>{toast.title}</ToastTitle>
                  <ToastDescription>{toast.description}</ToastDescription>
                </div>
              </div>
              <ToastAction altText="Close">Dismiss</ToastAction>
            </Toast>
          )}
        </AnimatePresence>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default NodeEditor;
