import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";

export const TimerNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [duration, setDuration] = useState(data?.duration || 1000);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setDuration(value);
    updateNodeField(id, "duration", value);
  };

  const handles = [
    {type: "target", position: Position.Left, id: "start"},
    {type: "source", position: Position.Right, id: "end"},
  ];

  return (
    <BaseNode id={id} data={data} title="Timer" icon="⏱️" handles={handles}>
      <label className="node-label">Duration (ms):</label>
      <input
        type="number"
        className="node-input"
        value={duration}
        onChange={handleChange}
      />
    </BaseNode>
  );
};
