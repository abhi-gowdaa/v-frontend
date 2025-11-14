import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { RunPipelineDrawer } from './RunPipelineDrawer';

function App() {
  return (
    <div>
    <div>
      <h3> Drag and Drop the Nodes(Input, llm, text ,output) rest are demo, submit to get if its dag or not, run pipline for the chat interface </h3>
    </div>
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <RunPipelineDrawer />
    </div>
    </div>
  );
}

export default App;
