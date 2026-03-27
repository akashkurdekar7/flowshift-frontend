import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";

export const OutputNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, "outputName", value);
  };

  const handles = [{type: "target", position: Position.Left, id: "value"}];

  return (
    <BaseNode id={id} data={data} title="Output" icon="📤" handles={handles}>
      <div className="flex">
        <label className="node-label">Name:</label>
        <input
          type="text"
          className="node-input"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
    </BaseNode>
  );
};
