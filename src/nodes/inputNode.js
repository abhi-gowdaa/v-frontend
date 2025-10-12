// inputNode.js

import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from '../Components/BaseNode';
import NodeInput from '../Components/NodeInput';
import NodeSelect from './../Components/NodeSelect';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector=(state)=>({
  getNodeID:state.getNodeID,
  updateNodeField: state.updateNodeField,
  getEdges:state.getEdges,
  edges:state.edges,
  nodes:state.nodes,
  setNewNodeId:state.setNewNodeId

});

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName|| id);
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const {edges,nodes,setNewNodeId,updateNodeField}=useStore(selector,shallow);
  const [nodeId,setNodeId]=useState();

 
  // useEffect(()=>{
  //   setNewNodeId(id, id.replace('customInput-', 'input_'));
  // },[])

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  
    console.log({id});
     console.log({edges});

     updateNodeField(id, 'inputName', e.target.value);

     console.log(`node ${id}`,nodes.find((n)=>n.id===id));
     
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };



  return ( 
      <BaseNode  title="Input" id={id} direction="left" >
      <NodeInput key={id} currName={currName} handleNameChange={handleNameChange} />
      <NodeSelect label="Type :" currType={inputType} handleTypeChange={handleTypeChange} />
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
       </BaseNode>
  );
}
