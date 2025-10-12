import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeSelect from "../Components/NodeSelect";

export const WebSearchNode = ({ id, data }) => {
  const [maxResults, setMaxResults] = useState(data?.maxResults || '10');
  

  const resultOptions = [
    { value: '5', label: '5 Results' },
    { value: '10', label: '10 Results' },
    { value: '20', label: '20 Results' },
    { value: '50', label: '50 Results' }
  ];

  return (
    <BaseNode
      title="Web Search"
      id={id}
      
      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-query` },
        { type: "source", position: Position.Right, handleId: `${id}-results` }
      ]}
    >
     

      <NodeSelect
        label="Max Results"
        type={maxResults}
        handleTypeChange={(e) => setMaxResults(e.target.value)}
        content={resultOptions}
      />

     
    </BaseNode>
  );
};
