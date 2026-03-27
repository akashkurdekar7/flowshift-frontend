import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";

export const InputNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currValue, setCurrValue] = useState(data?.value || "");

  const handleValueChange = (e) => {
    const value = e.target.value;
    setCurrValue(value);
    updateNodeField(id, "value", value);
  };

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: "default",
    },
  ];

  return (
    <BaseNode id={id} data={data} title="Input" icon="📥" handles={handles}>
      <div className="flex">
        <label className="node-label">Value:</label>
        <input
          type="text"
          className="node-input"
          value={currValue}
          onChange={handleValueChange}
        />
      </div>
    </BaseNode>
  );
};
