import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";
import CustomSelect from "./CustomSelect";

export const LogicNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [op, setOp] = useState(data?.op || "AND");

  const handleChange = (e) => {
    setOp(e.target.value);
    updateNodeField(id, "op", e.target.value);
  };

  const handles = [
    {type: "target", position: Position.Left, id: "a", style: {top: "30%"}},
    {type: "target", position: Position.Left, id: "b", style: {top: "70%"}},
    {type: "source", position: Position.Right, id: "out"},
  ];

  const opOptions = [
    {value: "AND", label: "AND"},
    {value: "OR", label: "OR"},
    {value: "NOT", label: "NOT"},
  ];

  return (
    <BaseNode id={id} data={data} title="Logic" icon="🧩" handles={handles}>
      <CustomSelect
        label="Operation:"
        value={op}
        onChange={handleChange}
        options={opOptions}
      />
    </BaseNode>
  );
};
