// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from '../Components/BaseNode';
import NodeInput from '../Components/NodeInput';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector=(state)=>({
 
  edges:state.edges,
  nodes:state.nodes,
  setEdges:state.setEdges,

});

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
   const {edges,nodes,setEdges}=useStore(selector,shallow);
 


  const handleTextChange = (e) => {
    setCurrText(e.target.value);

    if (currText.trim().includes('{{') && currText.trim().includes('}}'))   {
      console.log("Valid text with {{}} found");
       
      const extractedText = currText.trim().match(/{{(.*?)}}/)[1].trim();
      console.log("Extracted Text:", extractedText);
      const variable=nodes.filter((node)=>node.id===extractedText);
      if(!variable){
       
          return
      }
       console.log("var",variable[0]);

     const newEdges = {
      id:`${id}-${extractedText}`,
      source:id,
      target:variable,

     }

     setEdges([...edges,newEdges]);
 
    }
  };

  return (
    <BaseNode title="Text" id={id} direction="left" >
    <NodeInput label="Text:" currName={currText} handleNameChange={handleTextChange} />
 
    <Handle
        type="target"
        position={Position.Right}
        id={`${id}-output`}
      />
    </BaseNode>
  );
}
