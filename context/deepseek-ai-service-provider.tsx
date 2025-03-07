"use client";
import React, { createContext, useContext, useState } from "react";
import { Node, NodeType } from "@/types/node";

interface DeepSeekResponse {
  success: boolean;
  message: string;
  suggestions?: string[] | null;
  improvements?:
    | {
        field: string;
        suggestion: string;
      }[]
    | null;
}

interface DeepSeekContextType {
  isAnalyzing: boolean;
  lastAnalysis: DeepSeekResponse | null;
  analyzeNode: (node: Node) => Promise<DeepSeekResponse>;
  generateImprovement: (node: Node, field: string) => Promise<string>;
  isLoading: boolean;
}

const simulateAIResponse = (node: Node): Promise<DeepSeekResponse> => {
  return new Promise((resolve) => {
    
    setTimeout(() => {
      let response: DeepSeekResponse = {
        success: true,
        message: "Node analysis complete",
        suggestions: [],
        improvements: [],
      };

      switch (node.type) {
        case NodeType.GREETING:
          if (node.data.message.length < 50) {
            response.message = "Your greeting message could be more detailed";
            response.suggestions = [
              "Add a personalized introduction",
              "Mention the purpose of the call",
              "Include a brief company introduction",
            ];
            response.improvements = [
              {
                field: "message",
                suggestion: `Hello, I'm calling from Caantin AI. We're an AI voice solutions company helping businesses across Africa automate their customer interactions. How can I assist you today with our services?`,
              },
            ];
          } else if (node.data.message.includes("help")) {
            response.message = "Great helpful tone in your greeting";
            response.suggestions = [
              "Consider adding a brief pause after introduction",
            ];
          }
          break;

        case NodeType.QUESTION:
          if (node.data.options.length <= 2) {
            response.message = "Consider adding more response options";
            response.suggestions = [
              "Add more nuanced options",
              "Include a 'not sure' option",
              "Allow users to request more information",
            ];
            response.improvements = [
              {
                field: "options",
                suggestion: "Maybe later",
              },
            ];
          }

          if (node.data.question.endsWith("?") === false) {
            response.message = "Your question doesn't include a question mark";
            response.suggestions = [
              "Add a question mark",
              "Rephrase to make it clearer it's a question",
            ];
          }
          break;

        case NodeType.INFORMATION:
          if (node.data.message.split(" ").length < 15) {
            response.message = "Your information seems brief";
            response.suggestions = [
              "Add more specific details about your services",
              "Include a benefit statement",
              "Consider adding context around your information",
            ];
            response.improvements = [
              {
                field: "message",
                suggestion: `We offer intelligent voice solutions for businesses across Africa. Our AI-powered systems can handle customer inquiries, appointment scheduling, and satisfaction surveys with natural-sounding voices in multiple languages, reducing your operational costs while improving customer experience.`,
              },
            ];
          }
          break;
      }

      resolve(response);
    }, 1500);
  });
};


const simulateFieldImprovement = (
  node: Node,
  field: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let improvement = "";

      switch (node.type) {
        case NodeType.GREETING:
          if (field === "message") {
            improvement =
              "Hello! I'm calling from Caantin AI. We're excited to share how our voice solutions can transform your business operations across Africa. How are you doing today?";
          }
          break;

        case NodeType.QUESTION:
          if (field === "question") {
            improvement =
              "Would you be interested in learning how our AI voice solutions could reduce your customer service costs by up to 40%?";
          } else if (field === "options") {
            improvement = "I'd like to hear more specific details";
          }
          break;

        case NodeType.INFORMATION:
          if (field === "message") {
            improvement =
              "Caantin AI's voice solutions are deployed across 12 African countries, serving over 200 businesses in banking, healthcare, and retail. Our technology handles over 100,000 customer interactions daily with a 95% satisfaction rate, saving our clients an average of 32 hours of staff time per week.";
          }
          break;
      }

      resolve(improvement);
    }, 1000);
  });
};

const DeepSeekContext = createContext<DeepSeekContextType | undefined>(
  undefined
);

export const DeepSeekProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastAnalysis, setLastAnalysis] = useState<DeepSeekResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analyzeNode = async (node: Node): Promise<DeepSeekResponse> => {
    setIsAnalyzing(true);
    setIsLoading(true);

    try {
      
      const response = await simulateAIResponse(node);
      setLastAnalysis(response);
      return response;
    } catch (error) {
      console.error("Error analyzing node with DeepSeek:", error);
      const errorResponse: DeepSeekResponse = {
        success: false,
        message: "Error analyzing your node. Please try again.",
      };
      setLastAnalysis(errorResponse);
      return errorResponse;
    } finally {
      setIsAnalyzing(false);
      setIsLoading(false);
    }
  };

  const generateImprovement = async (
    node: Node,
    field: string
  ): Promise<string> => {
    setIsLoading(true);

    try {
      const improvement = await simulateFieldImprovement(node, field);
      return improvement;
    } catch (error) {
      console.error("Error generating improvement with DeepSeek:", error);
      return "Unable to generate improvement at this time.";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeepSeekContext.Provider
      value={{
        isAnalyzing,
        lastAnalysis,
        analyzeNode,
        generateImprovement,
        isLoading,
      }}
    >
      {children}
    </DeepSeekContext.Provider>
  );
};

export const useDeepSeek = () => {
  const context = useContext(DeepSeekContext);
  if (context === undefined) {
    throw new Error("useDeepSeek must be used within a DeepSeekProvider");
  }
  return context;
};
