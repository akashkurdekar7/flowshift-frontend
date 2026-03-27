import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";
import CustomSelect from "./CustomSelect";

export const MathNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [op, setOp] = useState(data?.op || "ADD");

  const handleChange = (e) => {
    setOp(e.target.value);
    updateNodeField(id, "op", e.target.value);
  };

  const handles = [
    {type: "target", position: Position.Left, id: "a", style: {top: "30%"}},
    {type: "target", position: Position.Left, id: "b", style: {top: "70%"}},
    {type: "source", position: Position.Right, id: "result"},
  ];

  const opOptions = [
    {value: "ADD", label: "ADD"},
    {value: "SUB", label: "SUB"},
    {value: "MUL", label: "MUL"},
    {value: "DIV", label: "DIV"},
  ];

  return (
    <BaseNode id={id} data={data} title="Math" icon="🔢" handles={handles}>
      <CustomSelect
        label="Operation:"
        value={op}
        onChange={handleChange}
        options={opOptions}
      />
    </BaseNode>
  );
};
