// import {useState, useEffect} from "react";
// import {Position} from "reactflow";
// import {BaseNode} from "./BaseNode";
// import {useStore} from "../store";
// import {CustomSelect} from "./CustomSelect";
// import {useUpdateNodeInternals} from "reactflow";

// export const InputNode = ({id, data}) => {
//   const updateNodeField = useStore((state) => state.updateNodeField);
//   const [currName, setCurrName] = useState(data?.inputName || "input");
//   const [currValue, setCurrValue] = useState(data?.value || "");
//   const updateNodeInternals = useUpdateNodeInternals();
//   const [inputType, setInputType] = useState(data.inputType || "Text");

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setCurrName(value);
//     updateNodeField(id, "inputName", value);
//   };

//   const handleValueChange = (e) => {
//     const value = e.target.value;
//     setCurrValue(value);
//     updateNodeField(id, "value", value);
//   };

//   const handleTypeChange = (e) => {
//     const value = e.target.value;
//     setInputType(value);
//     updateNodeField(id, "inputType", value);
//   };

//   const handles = [
//     {
//       type: "source",
//       position: Position.Right,
//       id: currName, // 🔥 dynamic handle
//     },
//   ];

//   const typeOptions = [
//     {value: "Text", label: "Text"},
//     {value: "File", label: "File"},
//   ];
//   useEffect(() => {
//     updateNodeInternals(id);
//   }, [currName]);

//   return (
//     <BaseNode id={id} data={data} title="Input" icon="📥" handles={handles}>
//       <div className="flex">
//         <label className="node-label">Value:</label>
//         <input
//           type="text"
//           className="node-input"
//           value={currValue}
//           onChange={handleValueChange}
//         />
//       </div>
//       <div className="flex">
//         <CustomSelect
//           label="Type:"
//           value={inputType}
//           onChange={handleTypeChange}
//           options={typeOptions}
//         />
//       </div>
//     </BaseNode>
//   );
// };

import {useState} from "react";
import {Position} from "reactflow";
import {BaseNode} from "./BaseNode";
import {useStore} from "../components/Store";
import CustomSelect from "./CustomSelect";

export const InputNode = ({id, data}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currValue, setCurrValue] = useState(data?.value || "");
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleValueChange = (e) => {
    const value = e.target.value;
    setCurrValue(value);
    updateNodeField(id, "value", value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, "inputType", value);
  };

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: "default", // ✅ keep stable (important for backend)
    },
  ];

  const typeOptions = [
    {value: "Text", label: "Text"},
    {value: "File", label: "File"},
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

      <div className="flex">
        <CustomSelect
          label="Type:"
          value={inputType}
          onChange={handleTypeChange}
          options={typeOptions}
        />
      </div>
    </BaseNode>
  );
};
