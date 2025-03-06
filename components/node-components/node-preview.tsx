import React from 'react';
import { motion } from 'framer-motion';

import { MessageCircle, HelpCircle, Info } from 'lucide-react';
import { NodeType, Node } from '@/types/node';

interface NodePreviewProps {
  node: Node;
}

const NodePreview: React.FC<NodePreviewProps> = ({ node }) => {
  const getNodeClass = () => {
    switch (node.type) {
      case NodeType.GREETING:
        return 'greeting-node';
      case NodeType.QUESTION:
        return 'question-node';
      case NodeType.INFORMATION:
        return 'information-node';
      default:
        return '';
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case NodeType.GREETING:
        return <MessageCircle className="h-5 w-5" />;
      case NodeType.QUESTION:
        return <HelpCircle className="h-5 w-5" />;
      case NodeType.INFORMATION:
        return <Info className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (node.type) {
      case NodeType.GREETING:
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              {getNodeIcon()}
              <span>Greeting</span>
            </div>
            <p className="text-sm">{node.data.message}</p>
          </div>
        );
      case NodeType.QUESTION:
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium">
              {getNodeIcon()}
              <span>Question</span>
            </div>
            <p className="text-sm">{node.data.question}</p>
            <div className="space-y-2 mt-2">
              {node.data.options.map((option, index) => (
                <div 
                  key={index}
                  className="bg-white/20 px-3 py-1.5 rounded-lg text-xs backdrop-blur-sm"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        );
      case NodeType.INFORMATION:
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              {getNodeIcon()}
              <span>Information</span>
            </div>
            <p className="text-sm">{node.data.message}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 15,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h3 className="text-lg font-medium mb-3">Node Preview</h3>
      <motion.div 
        className={`node-container ${getNodeClass()}`}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {renderContent()}
        <div className="mt-4 flex justify-between text-xs opacity-75">
          <span>ID: {node.id.substring(0, 8)}...</span>
          <span>{node.type.toUpperCase()}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NodePreview;