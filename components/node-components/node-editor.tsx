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
import { CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from "lucide-react";
import {
  createNewNode,
  NodeType,
  Node,
  GreetingNode,
  QuestionNode,
  InformationNode,
} from "@/types/node";
import NodeTypeSelector from "./node-type-selector";
import NodePreview from "./node-preview";
import PropertiesPanel from "./properties-panel";
import { Button } from "@/components/ui/button";
import { useNodeContext } from "@/context/node-context-provider";
import { useToast } from "@/context/toast-context-provider";
import { useDeepSeek } from "@/context/deepseek-ai-service-provider";

const NodeEditor: React.FC = () => {
  const { currentNode, setCurrentNode, saveNode, updateNode } =
    useNodeContext();
  const { toast, showToast, hideToast } = useToast();
  const { analyzeNode, isAnalyzing, lastAnalysis, isLoading } = useDeepSeek();
  const [currentNodeType, setCurrentNodeType] = useState<NodeType>(
    NodeType.GREETING
  );
  const [showAIFeedback, setShowAIFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (!currentNode) {
      setCurrentNode(createNewNode(NodeType.GREETING));
    } else {
      setCurrentNodeType(currentNode.type);
    }
  }, [currentNode, setCurrentNode]);

  //I would like to handle node chnages here
  const handleNodeTypeChange = (type: NodeType) => {
    if (type !== currentNodeType) {
      setCurrentNodeType(type);
      const newNode = createNewNode(type);
      setCurrentNode(newNode);
      setShowAIFeedback(false);
    }
  };

  const handleNodeUpdate = (updatedNode: Node) => {
    updateNode(updatedNode);
  };

  const handleSave = () => {
    if (currentNode) {
      const result = saveNode(currentNode);

      showToast({
        title: result.success ? "Node Saved" : "Error",
        description: result.message,
        type: result.success ? "success" : "destructive",
      });
    }
  };

  // AI analysis of the current node
  const handleAnalyzeWithAI = async () => {
    if (!currentNode) return;

    try {
      const analysis = await analyzeNode(currentNode);
      setShowAIFeedback(true);

      if (analysis.success) {
        showToast({
          title: "AI Analysis Complete",
          description: analysis.message,
          type: "default",
        });
      } else {
        showToast({
          title: "AI Analysis Failed",
          description: analysis.message,
          type: "destructive",
        });
      }
    } catch (error) {
      showToast({
        title: "AI Analysis Error",
        description: "Failed to analyze node with DeepSeek AI",
        type: "destructive",
      });
    }
  };

  // I would like to simulate the AI suggestion here
  const handleApplySuggestion = (improvement: {
    field: string;
    suggestion: string;
  }) => {
    if (!currentNode) return;

    switch (currentNode.type) {
      case NodeType.GREETING: {
        const greetingNode = currentNode as GreetingNode;
        if (improvement.field === "message") {
          const updatedNode: GreetingNode = {
            ...greetingNode,
            data: {
              ...greetingNode.data,
              message: improvement.suggestion,
            },
          };
          updateNode(updatedNode);
        }
        break;
      }
      case NodeType.INFORMATION: {
        const infoNode = currentNode as InformationNode;
        if (improvement.field === "message") {
          const updatedNode: InformationNode = {
            ...infoNode,
            data: {
              ...infoNode.data,
              message: improvement.suggestion,
            },
          };
          updateNode(updatedNode);
        }
        break;
      }
      case NodeType.QUESTION: {
        const questionNode = currentNode as QuestionNode;
        if (improvement.field === "question") {
          const updatedNode: QuestionNode = {
            ...questionNode,
            data: {
              ...questionNode.data,
              question: improvement.suggestion,
            },
          };
          updateNode(updatedNode);
        } else if (improvement.field === "options") {
          const updatedNode: QuestionNode = {
            ...questionNode,
            data: {
              ...questionNode.data,
              options: [...questionNode.data.options, improvement.suggestion],
            },
          };
          updateNode(updatedNode);
        }
        break;
      }
    }

    showToast({
      title: "AI Suggestion Applied",
      description: `Applied DeepSeek AI suggestion to ${improvement.field}`,
      type: "success",
    });
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

      {currentNode && (
        <>
          <NodeTypeSelector
            currentType={currentNode.type}
            onTypeChange={handleNodeTypeChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div layout className="md:order-2">
              <NodePreview node={currentNode} />

              {/* AI Analysis Button */}
              <motion.div
                className="mt-4 flex justify-end cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleAnalyzeWithAI}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Analyze with DeepSeek AI
                </Button>
              </motion.div>

              <AnimatePresence>
                {showAIFeedback && lastAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-blue-800">
                          DeepSeek AI Feedback
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                          {lastAnalysis.message}
                        </p>

                        {lastAnalysis.suggestions &&
                          lastAnalysis.suggestions.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium text-blue-700">
                                Suggestions:
                              </h4>
                              <ul className="mt-1 text-sm text-blue-600 space-y-1">
                                {lastAnalysis.suggestions.map(
                                  (suggestion, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-blue-400">•</span>
                                      <span>{suggestion}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {lastAnalysis.improvements &&
                          lastAnalysis.improvements.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-blue-700">
                                Recommended Improvements:
                              </h4>
                              <div className="mt-2 space-y-3">
                                {lastAnalysis.improvements.map(
                                  (improvement, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white border border-blue-200 rounded-md p-3"
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium capitalize">
                                          {improvement.field}
                                        </span>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs h-7 border-blue-300 text-blue-600 hover:bg-blue-50"
                                          onClick={() =>
                                            handleApplySuggestion(improvement)
                                          }
                                        >
                                          Apply
                                        </Button>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        {improvement.suggestion}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div layout className="md:order-1">
              <PropertiesPanel
                node={currentNode}
                onUpdate={handleNodeUpdate}
                onSave={handleSave}
              />
            </motion.div>
          </div>
        </>
      )}

      <ToastProvider>
        <AnimatePresence>
          {toast.open && (
            <Toast
              variant={
                toast.type === "success"
                  ? "success"
                  : toast.type === "destructive"
                  ? "destructive"
                  : "default"
              }
            >
              <div className="flex items-start gap-2">
                {toast.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                ) : toast.type === "destructive" ? (
                  <AlertTriangle className="h-5 w-5 text-white" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
                <div>
                  <ToastTitle>{toast.title}</ToastTitle>
                  <ToastDescription>{toast.description}</ToastDescription>
                </div>
              </div>
              <ToastAction altText="Close" onClick={hideToast}>
                Dismiss
              </ToastAction>
            </Toast>
          )}
        </AnimatePresence>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default NodeEditor;
