import { Node } from "@/types/node";

const STORAGE_KEY = "caantin-ai-nodes";

export const saveNodeToStorage = (node: Node): void => {
  try {
    const existingNodesJSON = localStorage.getItem(STORAGE_KEY);
    const existingNodes: Node[] = existingNodesJSON
      ? JSON.parse(existingNodesJSON)
      : [];

    const nodeIndex = existingNodes.findIndex((n) => n.id === node.id);

    if (nodeIndex >= 0) {
      existingNodes[nodeIndex] = node;
    } else {
      // Add new node
      existingNodes.push(node);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingNodes));

    return;
  } catch (error) {
    console.error("Error saving node to localStorage:", error);
  }
};

export const getNodesFromStorage = (): Node[] => {
  try {
    const nodesJSON = localStorage.getItem(STORAGE_KEY);
    return nodesJSON ? JSON.parse(nodesJSON) : [];
  } catch (error) {
    console.error("Error retrieving nodes from localStorage:", error);
    return [];
  }
};

export const getNodeFromStorage = (nodeId: string): Node | null => {
  try {
    const nodes = getNodesFromStorage();
    return nodes.find((node) => node.id === nodeId) || null;
  } catch (error) {
    console.error("Error retrieving node from localStorage:", error);
    return null;
  }
};

export const deleteNodeFromStorage = (nodeId: string): void => {
  try {
    const nodes = getNodesFromStorage();
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNodes));
  } catch (error) {
    console.error("Error deleting node from localStorage:", error);
  }
};
