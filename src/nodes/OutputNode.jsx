import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";
import CustomSelect from "./CustomSelect";

export const OutputNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, "outputName", value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setOutputType(value);
    updateNodeField(id, "outputType", value);
  };

  const handles = [{type: "target", position: Position.Left, id: "value"}];

  const typeOptions = [
    {value: "Text", label: "Text"},
    {value: "File", label: "File"},
  ];

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
      <div className="flex">
        <CustomSelect
          label="Type:"
          value={outputType}
          onChange={handleTypeChange}
          options={typeOptions}
        />
      </div>
    </BaseNode>
  );
};
