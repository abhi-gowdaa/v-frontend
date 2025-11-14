import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { RunPipelineDrawer } from './RunPipelineDrawer';

function App() {
  return (
    <div>
      <h2>Drag and Drop the Nodes(Input, llm, text ,output) rest are demo, submit to get if its dag or not, run pipline for the chat interface</h2>
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
