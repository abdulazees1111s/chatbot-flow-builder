interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <button
      onClick={() => {
        console.log("Save clicked");
        onSave();
      }}
      style={{
        position: "absolute",
        top: 15,
        right: 15,
        padding: "10px 18px",
        borderRadius: 8,
        border: "none",
        background: "#6d28d9",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
        zIndex: 10
      }}
    >
      Save
    </button>
  );
};

export default SaveButton;
