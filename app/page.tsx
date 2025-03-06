import NodeEditor from "@/components/node-components/node-editor";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="py-8 px-4">
        <NodeEditor />
      </div>
    </main>
  );
}
