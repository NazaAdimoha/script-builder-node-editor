"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, X } from "lucide-react";
import { QuestionNode } from "@/types/node";
import { Textarea } from "../ui/text-area";

interface QuestionNodeFormProps {
  node: QuestionNode;
  onUpdate: (node: QuestionNode) => void;
  showValidation: boolean;
}

const QuestionNodeForm: React.FC<QuestionNodeFormProps> = ({
  node,
  onUpdate,
  showValidation,
}) => {
  const [question, setQuestion] = useState<string>(node.data.question);
  const [options, setOptions] = useState<string[]>(node.data.options);
  const [newOption, setNewOption] = useState<string>("");

  const isQuestionValid = question.trim().length > 0;
  const areOptionsValid =
    options.length >= 2 && options.every((opt) => opt.trim().length > 0);
  const isValid = isQuestionValid && areOptionsValid;

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    onUpdate({
      ...node,
      data: {
        ...node.data,
        question: newQuestion,
      },
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onUpdate({
      ...node,
      data: {
        ...node.data,
        options: newOptions,
      },
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    onUpdate({
      ...node,
      data: {
        ...node.data,
        options: newOptions,
      },
    });
  };

  const handleAddOption = () => {
    if (newOption.trim() === "") return;

    const newOptions = [...options, newOption.trim()];
    setOptions(newOptions);
    setNewOption("");
    onUpdate({
      ...node,
      data: {
        ...node.data,
        options: newOptions,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-accent-orange-600">
        <HelpCircle className="h-5 w-5" />
        <h3 className="text-lg font-medium">Question Configuration</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="question-text" className="text-sm text-gray-600">
          Question Text
        </Label>
        <Textarea
          id="question-text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question here..."
          className={`min-h-[100px] ${
            !isQuestionValid && showValidation
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
        />
        {!isQuestionValid && showValidation && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-red-500 mt-1"
          >
            Question text is required
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          This is the question that will be posed to the customer.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600">Answer Options</Label>
          {options.length < 2 && showValidation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              At least 2 options required
            </motion.p>
          )}
        </div>

        <motion.div className="space-y-2">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={`${
                  option.trim() === "" && showValidation
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
                className="h-10 w-10 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center gap-2 mt-2">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="New option"
            onKeyDown={(e) => {
              if (e.key === "Enter" && newOption.trim() !== "") {
                e.preventDefault();
                handleAddOption();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddOption}
            disabled={newOption.trim() === ""}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Add at least 2 options that the customer can choose from.
        </p>
      </div>
    </motion.div>
  );
};

export default QuestionNodeForm;
