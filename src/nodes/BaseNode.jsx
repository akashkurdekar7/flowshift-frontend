import {Handle} from "reactflow";
import {useStore} from "../components/Store";

export const BaseNode = ({id, data, title, icon, children, handles = []}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);

  const handleDelete = () => {
    onNodesChange([{id, type: "remove"}]);
  };

  return (
    <div className="node-container">
      <div className="node-header">
        <div className="node-header-left">
          {icon && <span className="node-icon">{icon}</span>}
          <span className="node-title">{title}</span>
        </div>
        <button
          className="node-delete-btn"
          onClick={handleDelete}
          title="Delete Node">
          &times;
        </button>
      </div>
      <div className="node-body">{children}</div>
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id} // ✅ FIXED
          style={handle.style}
          className="node-handle"
        />
      ))}
    </div>
  );
};
