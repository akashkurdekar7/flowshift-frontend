import {useState, useRef, useCallback} from "react";
import ReactFlow, {Controls, Background, MarkerType} from "reactflow";
import {useStore} from "../components/Store";
import {shallow} from "zustand/shallow";
import {InputNode} from "../nodes/InputNode";
import {LLMNode} from "../nodes/LLMNode";
import {OutputNode} from "../nodes/OutputNode";
import {TextNode} from "../nodes/TextNode";
import {NoteNode} from "../nodes/NoteNode";
import {TimerNode} from "../nodes/TimerNode";
import {AlertNode} from "../nodes/AlertNode";
import {LogicNode} from "../nodes/LogicNode";
import {MathNode} from "../nodes/MathNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = {hideAttribution: true};
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  timer: TimerNode,
  alert: AlertNode,
  logic: LogicNode,
  math: MathNode,
};

// ✅ Improved connection styles
const defaultEdgeOptions = {
  type: "smoothstep",
  animated: true,
  style: {
    strokeWidth: 2,
    stroke: "#94a3b8",
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#94a3b8",
  },
};
const Ui = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = {id: nodeID, nodeType: `${type}`};
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{width: "100vw", height: "100vh", background: "var(--bg-deep)"}}>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          defaultEdgeOptions={defaultEdgeOptions}>
          <Background color="#222" gap={gridSize} variant="dots" size={1} />
          {/* <MiniMap
            nodeColor="#6366f1"
            nodeStrokeWidth={3}
            zoomable
            pannable
            position="bottom-right"
          /> */}
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default Ui;
