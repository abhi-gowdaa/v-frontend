import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeInput from "../Components/NodeInput";

export const EmailSenderNode = ({ id, data }) => {
  const [email, setSubject] = useState('');
  const [content, setContent] = useState('');

 
  return (
    <BaseNode
      title="Email Sender"
      id={id}
      
      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-content` },
        { type: "source", position: Position.Right, handleId: `${id}-status` }
      ]}
    >       <NodeInput label="email address" key={id} currName={email} handleNameChange={(e) => setSubject(e.target.value)} placeholder="Recipient Email" />
            <NodeInput  label="content" key={id} currName={content} handleNameChange={(e) => setContent(e.target.value)} /> 
      
    </BaseNode>
  );
};
