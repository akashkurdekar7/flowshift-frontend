import DraggableNode from "./DraggableNode";
import {useStore} from "./Store";

const Toolbar = () => {
  const clearCanvas = useStore((state) => state.clearCanvas);

  return (
    <div className="toolbar-container">
      <div className="flex justify-between items-center">
        <h2 className="toolbar-title">FlowShift</h2>
      </div>
      <div className="toolbar-items">
        <DraggableNode type="customInput" label="Input" icon="📥" />
        <DraggableNode type="llm" label="LLM" icon="🤖" />
        <DraggableNode type="customOutput" label="Output" icon="📤" />
        <DraggableNode type="text" label="Text" icon="📝" />
        <DraggableNode type="note" label="Note" icon="🗒️" />
        <DraggableNode type="timer" label="Timer" icon="⏱️" />
        <DraggableNode type="alert" label="Alert" icon="🔔" />
        <DraggableNode type="logic" label="Logic" icon="🧩" />
        <DraggableNode type="math" label="Math" icon="🔢" />
      </div>
      <div className="flex justify-between items-center">
        <button onClick={clearCanvas} className="clear-canvas-btn">
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
