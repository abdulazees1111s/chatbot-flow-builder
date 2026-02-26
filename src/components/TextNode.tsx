import { Handle, Position } from "reactflow";

const TextNode = ({ data }: any) => {
  return (
    <div
      style={{
        minWidth: 220,
        border: "2px solid black",
        borderRadius: 12,
        overflow: "hidden",
        background: "white",
        fontFamily: "sans-serif",
        position: "relative"
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#7c3aed",
          color: "white",
          padding: "8px 12px",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Send Message
      </div>

      {/* Body */}
      <div
        style={{
          padding: "12px",
          fontSize: 14,
          color: "black",
          background: "white",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {data.text}
      </div>

      {/* LEFT Connector (Incoming) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "black",
          width: 10,
          height: 10,
        }}
      />

      {/* RIGHT Connector (Outgoing) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "black",
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
};

export default TextNode;
