import {useState, useEffect, useRef} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";
import {useUpdateNodeInternals} from "reactflow";

export const TextNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Dynamic Handles Logic
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    setVariables(Array.from(matches));
  }, [currText]);

  // Dynamic Resizing Logic
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      textAreaRef.current.style.width = "auto";
      const newWidth = Math.max(
        200,
        Math.min(500, textAreaRef.current.scrollWidth + 20),
      );
      textAreaRef.current.style.width = `${newWidth}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, "text", value);
  };

  const handles = [
    ...variables.map((varName, index) => ({
      type: "target",
      position: Position.Left,
      id: varName,
      style: {top: `${((index + 1) * 100) / (variables.length + 1)}%`},
    })),
    {type: "source", position: Position.Right, id: "output"},
  ];
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);
  return (
    <BaseNode id={id} data={data} title="Text" icon="📝" handles={handles}>
      <div style={{display: "flex", flexDirection: "column"}}>
        <label className="node-label">Text:</label>
        <textarea
          ref={textAreaRef}
          className="node-input"
          value={currText}
          onChange={handleTextChange}
          style={{
            overflow: "hidden",
            minWidth: "180px",
            minHeight: "20px",
            resize: "none",
          }}
        />
      </div>
    </BaseNode>
  );
};
