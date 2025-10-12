// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from '../Components/BaseNode';
import NodeInput from '../Components/NodeInput';
import NodeSelect from '../Components/NodeSelect';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode title="Output" id={id} direction="left" >  
     <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{ 
                padding: '3px 3px', 
               
              }} 
      />
       
       <NodeInput currName={currName} handleNameChange={handleNameChange} />
        <NodeSelect label="Type :" type={outputType} handleTypeChange={handleTypeChange}/>
     
    </BaseNode>
  );
}
