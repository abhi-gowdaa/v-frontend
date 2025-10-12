import React, { useState } from 'react'
import BaseNode from '../Components/BaseNode'
import NodeInput from '../Components/NodeInput'
import { Handle, Position } from 'reactflow';

const PromptNode = ({id,data}) => {

    const [currName, setCurrName] = useState(data?.inputName|| id);
     
    
   
    const handleNameChange = (e) => {   
    setCurrName(e.target.value);
     ;
  }

  return (
    <BaseNode  title="Input" id={id} >
      <NodeInput key={id} currName={currName} handleNameChange={handleNameChange} /> 
       </BaseNode>
  )
}

export default PromptNode