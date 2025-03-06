import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NodeType } from '@/types/node';


interface NodeTypeSelectorProps {
  currentType: NodeType;
  onTypeChange: (type: NodeType) => void;
}

const NodeTypeSelector: React.FC<NodeTypeSelectorProps> = ({
  currentType,
  onTypeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
      <Button
        variant={currentType === NodeType.GREETING ? 'greeting' : 'outline'}
        onClick={() => onTypeChange(NodeType.GREETING)}
        className="flex-1 relative overflow-hidden"
      >
        {currentType === NodeType.GREETING && (
          <motion.div
            className="absolute inset-0 bg-caantin-400 opacity-10"
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        Greeting
      </Button>

      <Button
        variant={currentType === NodeType.QUESTION ? 'question' : 'outline'}
        onClick={() => onTypeChange(NodeType.QUESTION)}
        className="flex-1 relative overflow-hidden"
      >
        {currentType === NodeType.QUESTION && (
          <motion.div
            className="absolute inset-0 bg-accent-orange-400 opacity-10"
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        Question
      </Button>

      <Button
        variant={currentType === NodeType.INFORMATION ? 'information' : 'outline'}
        onClick={() => onTypeChange(NodeType.INFORMATION)}
        className="flex-1 relative overflow-hidden"
      >
        {currentType === NodeType.INFORMATION && (
          <motion.div
            className="absolute inset-0 bg-green-400 opacity-10"
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        Information
      </Button>
    </div>
  );
};

export default NodeTypeSelector;