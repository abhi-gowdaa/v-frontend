// llmNode.js

import { Handle, Position } from 'reactflow';
import BaseNode from '../Components/BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode title="LLM" id={id} direction="left" >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
       style={{ 
                padding: '3px 3px',
              }} 
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-prompt`}
        style={{ 
                padding: '4px 4px',
                marginLeft: '8px',
                fontSize: '15px',
              }} 
      />
       
      <div>
        <span>This is a LLM.</span>
      </div>
       
    </BaseNode>
  );
}
