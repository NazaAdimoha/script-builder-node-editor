// import NodeEditor from "@/components/node-components/node-editor";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="py-8 px-4">
//         <NodeEditor />
//       </div>
//     </main>
//   );
// }


import NodeEditor from "@/components/node-components/node-editor";
import { DeepSeekProvider } from "@/context/deepseek-ai-service-provider";
import { NodeProvider } from "@/context/node-context-provider";
import { ToastProvider } from "@/context/toast-context-provider";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NodeProvider>
        <ToastProvider>
          <DeepSeekProvider>
            <div className="py-8 px-4">
              <NodeEditor />
            </div>
          </DeepSeekProvider>
        </ToastProvider>
      </NodeProvider>
    </main>
  );
}