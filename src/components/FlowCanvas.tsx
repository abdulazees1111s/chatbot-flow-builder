import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import type { Connection, Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

import TextNode from "./TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";

const nodeTypes = { textNode: TextNode };

const FlowBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  // ?? Restore saved flow
  useEffect(() => {
    const saved = localStorage.getItem("chatbotFlow");
    if (saved) {
      const { nodes, edges } = JSON.parse(saved);
      setNodes(nodes);
      setEdges(edges);
    }
  }, []);

  const handleAddNode = () => {
    const id = uuidv4();
    const newNode: Node = {
      id,
      type: "textNode",
      position: { x: 250, y: 100 },
      data: { text: "New Message" },
    };
    setNodes(nds => nds.concat(newNode));
    setSelectedNodeId(id);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const alreadyConnected = edges.some(
        edge => edge.source === params.source
      );
      if (alreadyConnected) {
        alert("Only one outgoing edge allowed");
        return;
      }
      setEdges(eds => addEdge(params, eds));
    },
    [edges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { text: "New Message" },
      };

      setNodes(nds => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const updateNodeText = (text: string) => {
    if (!selectedNodeId) return;
    setNodes(nds =>
      nds.map(node =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  };

  // ?? FIXED SAVE FUNCTION
  const handleSave = () => {
    console.log("Saving flow...");
    localStorage.setItem("chatbotFlow", JSON.stringify({ nodes, edges }));
    alert("Flow saved successfully!");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 250, borderRight: "1px solid #eee" }}>
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            updateNode={updateNodeText}
          />
        ) : (
          <NodesPanel onAddNode={handleAddNode} />
        )}
      </div>

      <div ref={reactFlowWrapper} style={{ flex: 1, position: "relative" }}>
        <SaveButton onSave={handleSave} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          fitView
        >
          <Background variant="dots" gap={22} size={2.5} color="#6b7280" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowCanvas = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default FlowCanvas;
