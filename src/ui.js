// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import CustomEdge from './customEdge';

import 'reactflow/dist/style.css';
import { ImageGenerationNode } from './nodes/ImageGeneration';
import { AudioTranscriptionNode } from './nodes/audioTranscriptionNode';
import { WebSearchNode } from './nodes/websearchNode';
import { VectorSearchNode } from './nodes/VectorSearch';
import { EmailSenderNode } from './nodes/emailSenderNode';
import { DatabaseNode } from './nodes/databaseNode';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  image: ImageGenerationNode,
  audio: AudioTranscriptionNode,
  webSearch: WebSearchNode,
  vectorSearch: VectorSearchNode,
  database: DatabaseNode,
  emailSender: EmailSenderNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const edgeTypes = {
  'custom-edge': CustomEdge,
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode, 
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      console.log(`${type}`);
      console.log({nodeData});
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          console.log({reactFlowBounds,});
          console.log(event?.dataTransfer?.getData('application/reactflow'));
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            console.log({appData});
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
                 
            console.log(newNode);
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                edgeTypes={edgeTypes}
            >
                <Background 
                  color="#9948858a" 
                  gap={gridSize} 
                  size={3}
                  variant="dots"
                />
                <Controls 
                  style={{
                    button: {
                      background: 'white',
                      border: '1px solid #ddd',
                    }
                  }}
                />

                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
