import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeSelect from "../Components/NodeSelect";

export const VectorSearchNode = ({ id, data }) => {
  const [database, setDatabase] = useState(data?.database || 'pinecone');

  const databaseOptions = [
    { value: 'pinecone', label: 'Pinecone' },
    { value: 'chroma', label: 'ChromaDB' },
    { value: 'faiss', label: 'FAISS' }
  ];

  

  return (
    <BaseNode
      title="Vector Search"
      id={id}
    
      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-query` },
        { type: "source", position: Position.Right, handleId: `${id}-results` }
      ]}
    >
        
      <NodeSelect
        label="Vector Database"
        type={database}
        handleTypeChange={(e) => setDatabase(e.target.value)}
        content={databaseOptions}
      />

 
    </BaseNode>
  );
};