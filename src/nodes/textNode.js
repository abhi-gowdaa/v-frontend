// textNode.js - FIXED with automatic edge creation

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { MarkerType } from 'reactflow';
import BaseNode from '../Components/BaseNode';
import NodeInput from '../Components/NodeInput';

const selector = (state) => ({
  nodes: state.nodes,
  updateNodeField: state.updateNodeField,
  edges: state.edges,
  setEdges: state.setEdges,
});

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const { nodes, updateNodeField, edges, setEdges } = useStore(selector, shallow);

 
  useEffect(() => {
    const regex = /\{\{(\s*[\w_-]+\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1].trim());
    const uniqueVars = [...new Set(extractedVars)];
    
    
    const resolvedVars = uniqueVars.map(varName => {
      const matchingNode = nodes.find(node => 
        node.data?.inputName === varName || node.id === varName
      );
      
      return {
        varName: varName,
        nodeId: matchingNode?.id || null,
        exists: !!matchingNode
      };
    });
    
    setVariables(resolvedVars);
    
     
    const newEdges = [];
    resolvedVars.forEach(variable => {
      if (variable.exists && variable.nodeId) {
        const edgeId = `${variable.nodeId}-${id}-${variable.varName}`;
        
        
        const edgeExists = edges.some(edge => 
          edge.source === variable.nodeId && 
          edge.target === id && 
          edge.targetHandle === `${id}-${variable.varName}`
        );
        
        
        if (!edgeExists) {
          newEdges.push({
            id: edgeId,
            source: variable.nodeId,
            sourceHandle: `${variable.nodeId}-value`,
            target: id,
            targetHandle: `${id}-${variable.varName}`,
            type: 'custom-edge',
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: 20,
              width: 20
            }
          });
        }
      }
    });
    
    
    if (newEdges.length) {
      setEdges([...edges, ...newEdges]);
    }
    
     
    const currentVarNames = resolvedVars.map(v => v.varName);
    const filteredEdges = edges.filter(edge => {
       
      if (edge.target !== id) return true;
      
     
      const handleVar = edge.targetHandle?.replace(`${id}-`, '');
      return currentVarNames.includes(handleVar);
    });
    
 
    if (filteredEdges.length !== edges.length) {
      setEdges(filteredEdges);
    }
    
  }, [currText, nodes, id]); 

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  return (
     <BaseNode title="Text" id={id}>
       
        <div style={{ 
          fontSize: '10px', 
          color: '#999', 
          marginBottom: '8px',
          fontFamily: 'monospace',
          background: '#f5f5f5',
          padding: '3px 6px',
          borderRadius: '3px',
        }}>
          ID: {id}
        </div>
        
      <NodeInput
        label="Text:"
        currName={currText}
        handleNameChange={handleTextChange}
      />
        
       
        {variables.length > 0 && (
          <div style={{ 
            fontSize: '10px', 
            marginTop: '8px',
            padding: '6px',
            background: '#f9f9f9',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#666' }}>
              Variables:
            </div>
            {variables.map(v => (
              <div key={v.varName} style={{ 
                marginBottom: '3px',
                padding: '2px 4px',
                background: v.exists ? '#e8f5e9' : '#ffebee',
                borderRadius: '3px',
                color: v.exists ? '#2e7d32' : '#c62828',
                fontSize: '11px',
              }}>
                {v.varName} {v.exists ? `→ ${v.nodeId} ✓ (auto-connected)` : '(not found) '}
              </div>
            ))}
          </div>
        )}
      

       
      {variables.map((variable, index) => {
        const handleId = `${id}-${variable.varName}`;
        
        return (
          <Handle
            key={variable.varName}
            type="target"
            position={Position.Left}
            id={handleId}
            isConnectable={true}
            style={{
              top: `${40 + index * 30}px`,
              background: variable.exists ? '#4caf50' : '#f44336',
              width: '12px',
              height: '12px',
              border: '3px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{
              position: 'absolute',
              right: '18px',
              top: '-10px',
              fontSize: '11px',
              background: 'white',
              padding: '3px 6px',
              borderRadius: '4px',
              border: `2px solid ${variable.exists ? '#4caf50' : '#f44336'}`,
              whiteSpace: 'nowrap',
              color: variable.exists ? '#2e7d32' : '#c62828',
              fontWeight: 'bold',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              {variable.varName}
            </div>
          </Handle>
        );
      })}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        isConnectable={true}
        style={{
          background: '#555',
          width: '12px',
          height: '12px',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          top: '40px',
        }}
      />

       
    </BaseNode>
  );
};