import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../components/Store';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore(state => state.updateNodeField);
  const [note, setNote] = useState(data?.note || '');

  const handleChange = (e) => {
    setNote(e.target.value);
    updateNodeField(id, 'note', e.target.value);
  };

  return (
    <BaseNode id={id} data={data} title="Note" icon="🗒️">
      <textarea 
        className="node-input" 
        style={{ minHeight: '60px', resize: 'vertical' }}
        value={note}
        onChange={handleChange}
        placeholder="Type a note..."
      />
    </BaseNode>
  );
};
