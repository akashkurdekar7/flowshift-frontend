import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode id={id} data={data} title="LLM" icon="🤖" handles={handles}>
      <div>
        <span className="node-label">This is a LLM node. Configure your prompt and system settings.</span>
      </div>
    </BaseNode>
  );
}
