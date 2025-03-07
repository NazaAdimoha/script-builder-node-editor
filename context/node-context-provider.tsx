"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Node, NodeType, createNewNode } from "@/types/node";

type NodeContextType = {
  nodes: Node[];
  currentNode: Node | null;
  setCurrentNode: (node: Node) => void;
  saveNode: (node: Node) => { success: boolean; message: string };
  updateNode: (updatedNode: Node) => void;
  deleteNode: (nodeId: string) => { success: boolean; message: string };
  getNodeById: (nodeId: string) => Node | undefined;
};

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export const NodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);

  // Load nodes from localStorage on initial render
  useEffect(() => {
    const savedNodes = localStorage.getItem("caantin-nodes");
    if (savedNodes) {
      try {
        const parsedNodes = JSON.parse(savedNodes);
        setNodes(parsedNodes);

        if (parsedNodes.length > 0) {
          setCurrentNode(parsedNodes[parsedNodes.length - 1]);
        } else {
          
          const defaultNode = createNewNode(NodeType.GREETING);
          setCurrentNode(defaultNode);
        }
      } catch (error) {
        console.error("Error parsing saved nodes:", error);
        // Initialize with a default node if parsing fails
        const defaultNode = createNewNode(NodeType.GREETING);
        setCurrentNode(defaultNode);
      }
    } else {
      const defaultNode = createNewNode(NodeType.GREETING);
      setCurrentNode(defaultNode);
    }
  }, []);

  
  useEffect(() => {
    if (nodes.length > 0) {
      localStorage.setItem("caantin-nodes", JSON.stringify(nodes));
    }
  }, [nodes]);

  const saveNode = (node: Node) => {
    
    const existingNodeIndex = nodes.findIndex((n) => n.id === node.id);

    let message = "";

    if (existingNodeIndex >= 0) {
     
      const updatedNodes = [...nodes];
      updatedNodes[existingNodeIndex] = node;
      setNodes(updatedNodes);
      message = `${getNodeTypeName(node.type)} node updated successfully`;
    } else {
      
      setNodes([...nodes, node]);
      message = `New ${getNodeTypeName(node.type)} node created successfully`;
    }

    return { success: true, message };
  };

  const updateNode = (updatedNode: Node) => {
    setCurrentNode(updatedNode);
  };

  const deleteNode = (nodeId: string) => {
    const nodeToDelete = nodes.find((n) => n.id === nodeId);
    if (!nodeToDelete) {
      return {
        success: false,
        message: "Node not found",
      };
    }

    const filteredNodes = nodes.filter((n) => n.id !== nodeId);
    setNodes(filteredNodes);

    if (currentNode && currentNode.id === nodeId) {
      if (filteredNodes.length > 0) {
        setCurrentNode(filteredNodes[0]);
      } else {
        setCurrentNode(null);
      }
    }

    return {
      success: true,
      message: `${getNodeTypeName(
        nodeToDelete.type
      )} node deleted successfully`,
    };
  };

  const getNodeById = (nodeId: string) => {
    return nodes.find((n) => n.id === nodeId);
  };

  
  const getNodeTypeName = (type: NodeType): string => {
    switch (type) {
      case NodeType.GREETING:
        return "Greeting";
      case NodeType.QUESTION:
        return "Question";
      case NodeType.INFORMATION:
        return "Information";
      default:
        return "Unknown";
    }
  };

  return (
    <NodeContext.Provider
      value={{
        nodes,
        currentNode,
        setCurrentNode,
        saveNode,
        updateNode,
        deleteNode,
        getNodeById,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error("useNodeContext must be used within a NodeProvider");
  }
  return context;
};
