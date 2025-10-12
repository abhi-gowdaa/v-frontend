import { useState } from "react";
import BaseNode from "../Components/BaseNode";
import { Position } from "reactflow";
import NodeSelect from "../Components/NodeSelect";

export const AudioTranscriptionNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'whisper-1');
  const [language, setLanguage] = useState(data?.language || 'auto');


  const modelOptions = [
    { value: 'whisper-1', label: 'Whisper v1' },
    { value: 'whisper-large', label: 'Whisper Large' },
    { value: 'whisper-medium', label: 'Whisper Medium' },
    { value: 'whisper-small', label: 'Whisper Small' }
  ];

  const languageOptions = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'en', label: 'English' },
    { value: 'ka', label: 'Spanish' },
    { value: 'hi', label: 'French' },

  ]


  return (
    <BaseNode
      title="Audio Transcription"
      id={id}

      handles={[
        { type: "target", position: Position.Left, handleId: `${id}-audio` },
        { type: "source", position: Position.Right, handleId: `${id}-transcript` }
      ]}
    >
      <NodeSelect
        label="Model"
        type={model}
        handleTypeChange={(e) => setModel(e.target.value)}
        content={modelOptions}
      />

      <NodeSelect
        label="Language"
        type={language}
        handleTypeChange={(e) => setLanguage(e.target.value)}
        content={languageOptions}
      />

       
    </BaseNode>
  );
};