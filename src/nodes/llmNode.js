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
        style={{top: `${100/3}%`}}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-prompt`}
        style={{top: `${200/3}%`}}
      />
       
      <div>
        <span>This is a LLM.</span>
      </div>
       
    </BaseNode>
  );
}
