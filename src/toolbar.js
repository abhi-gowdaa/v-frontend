// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                 <DraggableNode type='emailSender' label='Email Sender' />
                {/* <DraggableNode type='imageGeneration' label='Image' /> */}
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='vectorSearch' label='Vector Search' />
                <DraggableNode type='audio' label='Audio' />
                <DraggableNode type='webSearch' label='Web Search' />

            </div>
        </div>
    );
};
