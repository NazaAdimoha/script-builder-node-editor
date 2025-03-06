# Caantin AI Script Builder Node Editor

A simplified version of a single key component of the Caantin AI Script Builder: the Node Properties Panel and visual representation of nodes. This application allows non-technical users to create and edit voice conversation nodes through an intuitive visual interface.

## Features

- Form-based editor for configuring node properties
- Support for 3 node types: Greeting, Question, and Information
- Type-specific form fields (e.g., message text for Greeting, question text and options for Question)
- Visual preview showing how the node will appear in the flow diagram
- Ability to save node configuration
- Validation for required fields
- Toggle to switch between node types
- Visual styling that differentiates node types in the preview
- Responsive design that works on mobile and desktop
- Micro-animations for enhanced user experience

## Technologies Used

- React & Next.js 15
- TypeScript for type safety
- TailwindCSS for styling
- Framer Motion for animations
- ShadCN UI for component foundation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/NazaAdimoha/script-builder-node-editor.git
cd script-builder-node-editor
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js app router files
- `/components`: React components
  - `/ui`: Reusable UI components
  - `/node-editor`: Node editor specific components
- `/types`: TypeScript type definitions
- `/lib`: Utility functions

## Implementation Details

### Node Types

The application supports three node types:

1. **Greeting Node**: For initial conversation greetings
   - Contains a message field

2. **Question Node**: For asking questions with multiple choice answers
   - Contains a question field
   - Contains multiple option fields

3. **Information Node**: For providing information to the customer
   - Contains a message field

### User Experience Considerations

- Form validation to ensure all required fields are filled
- Visual differentiation between node types using color coding
- Micro-animations to provide feedback and enhance user experience
- Responsive design that works well on both desktop and mobile
- Intuitive interface for non-technical users
- Clear visual preview of how nodes will appear in the script

## Design Decisions

- **Color Scheme**: Used a professional blue color palette for the Caantin AI brand, with different accent colors for each node type
- **Component Architecture**: Created reusable components with clear separation of concerns
- **Animation**: Added subtle animations to enhance UX without distracting from the main functionality
- **Validation**: Implemented immediate validation feedback to help users understand requirements
- **Preview**: Included a real-time preview so users can see exactly how their node will appear

## Future Enhancements

- Connection between nodes to build complete conversation flows
- Draggable interface for node positioning
- Undo/redo functionality
- Export/import of node configurations
- Node templates for common conversation patterns
- Voice preview functionality