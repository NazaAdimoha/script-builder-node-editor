import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix: string = "node"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get node color based on node type
export function getNodeColor(nodeType: string): string {
  switch (nodeType) {
    case "greeting":
      return "node-greeting";
    case "question":
      return "node-question";
    case "information":
      return "node-information";
    default:
      return "gray-400";
  }
}

// I want to Format node title based on node type
export function formatNodeTitle(nodeType: string): string {
  switch (nodeType) {
    case "greeting":
      return "Greeting";
    case "question":
      return "Question";
    case "information":
      return "Information";
    default:
      return nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
  }
}
