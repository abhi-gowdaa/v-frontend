import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeSelect from "../Components/NodeSelect";


export const ImageGenerationNode = ({ id, data }) => {
  const [model, setModel] = useState('dalle-3');
 

  const modelOptions = [
    { value: 'seedream-3', label: 'seedream' },
    { value: 'sora-2', label: 'sora 2' },
    
  ];

 
  return (
    <BaseNode
      title="Image Gen"
      id={id}
   
      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-prompt` },
        { type: "source", position: Position.Right, handleId: `${id}-image` }
      ]}
    >
      <NodeSelect
        label="Model"
        type={model}
        handleTypeChange={(e) => setModel(e.target.value)}
        content={modelOptions}
      />
      
    </BaseNode>
  );
};