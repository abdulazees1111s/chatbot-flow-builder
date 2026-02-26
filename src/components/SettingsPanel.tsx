import type { Node } from "reactflow";

interface SettingsPanelProps {
  selectedNode: Node;
  updateNode: (text: string) => void;
}

const SettingsPanel = ({ selectedNode, updateNode }: SettingsPanelProps) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>Edit Message</h3>
      <textarea
        style={{
          width: "100%",
          height: 100,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
        value={selectedNode.data.text}
        onChange={(e) => updateNode(e.target.value)}
      />
    </div>
  );
};

export default SettingsPanel;
