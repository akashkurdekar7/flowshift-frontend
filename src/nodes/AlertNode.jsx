import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";

export const AlertNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [message, setMessage] = useState(data?.message || "Alert!");

  const handleChange = (e) => {
    setMessage(e.target.value);
    updateNodeField(id, "message", e.target.value);
  };

  const handles = [{type: "target", position: Position.Left, id: "trigger"}];

  return (
    <BaseNode id={id} data={data} title="Alert" icon="🔔" handles={handles}>
      <label className="node-label">Message:</label>
      <input
        type="text"
        className="node-input"
        value={message}
        onChange={handleChange}
      />
    </BaseNode>
  );
};
