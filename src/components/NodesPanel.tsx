import React from "react";

interface NodesPanelProps {
  onAddNode: () => void;
}

const NodesPanel = ({ onAddNode }: NodesPanelProps) => {

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", "textNode");
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ padding: 20 }}>
      <button
        draggable
        onClick={onAddNode}
        onDragStart={onDragStart}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#6d28d9",   // Deep purple
          color: "white",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "grab",
          transition: "0.2s ease",
          boxShadow: "0 4px 12px rgba(109, 40, 217, 0.3)"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5b21b6")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
      >
        ?? Add / Drag Message Node
      </button>
    </div>
  );
};

export default NodesPanel;
