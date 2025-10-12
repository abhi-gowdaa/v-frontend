import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeSelect from "../Components/NodeSelect";

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'vectorshiftdb');
  const [queryType, setQueryType] = useState(data?.queryType || 'select');

  const dbOptions = [
    { value: 'vectorshiftdb', label: 'VectorShift DB' },
    { value: 'businessdb', label: 'Business DB' },
    { value: 'analyticsdb', label: 'Analytics DB' },
    { value: 'userdb', label: 'User DB' }
  ];

  const queryOptions = [
    { value: 'select', label: 'SELECT' },
    { value: 'insert', label: 'INSERT' },
    { value: 'update', label: 'UPDATE' },
    { value: 'delete', label: 'DELETE' }
  ];

  return (
    <BaseNode
      title="DB Connection"
      id={id}
      
      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-query` },
        { type: "source", position: Position.Right, handleId: `${id}-out` }
      ]}
    >
      <NodeSelect
        label="Database"
        type={dbType}
        handleTypeChange={(e) => setDbType(e.target.value)}
        content={dbOptions}
      />

      <NodeSelect
        label="Query Type"
        type={queryType}
        handleTypeChange={(e) => setQueryType(e.target.value)}
        content={queryOptions}
      />
    </BaseNode>
  );
};