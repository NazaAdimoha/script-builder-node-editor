export enum NodeType {
  GREETING = "greeting",
  QUESTION = "question",
  INFORMATION = "information",
}

export interface BaseNode {
  id: string;
  type: NodeType;
}

export interface GreetingNode extends BaseNode {
  type: NodeType.GREETING;
  data: {
    message: string;
  };
}

export interface QuestionNode extends BaseNode {
  type: NodeType.QUESTION;
  data: {
    question: string;
    options: string[];
  };
}

export interface InformationNode extends BaseNode {
  type: NodeType.INFORMATION;
  data: {
    message: string;
  };
}

export type Node = GreetingNode | QuestionNode | InformationNode;

export const createNewNode = (type: NodeType): Node => {
  const id = `node-${Date.now()}`;

  switch (type) {
    case NodeType.GREETING:
      return {
        id,
        type,
        data: {
          message:
            "Hello, I'm calling from Caantin AI. How can I help you today?",
        },
      };
    case NodeType.QUESTION:
      return {
        id,
        type,
        data: {
          question: "Would you like to know more about our services?",
          options: ["Yes", "No", "Tell me more"],
        },
      };
    case NodeType.INFORMATION:
      return {
        id,
        type,
        data: {
          message:
            "We offer intelligent voice solutions for businesses across Africa.",
        },
      };
  }
};

export function updateNodeData<T extends Node>(
  node: T,
  updatedData: Partial<T["data"]>
): T {
  return {
    ...node,
    data: {
      ...node.data,
      ...updatedData,
    },
  };
}

export function isGreetingNode(node: Node): node is GreetingNode {
  return node.type === NodeType.GREETING;
}

export function isQuestionNode(node: Node): node is QuestionNode {
  return node.type === NodeType.QUESTION;
}

export function isInformationNode(node: Node): node is InformationNode {
  return node.type === NodeType.INFORMATION;
}
