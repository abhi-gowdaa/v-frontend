import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { RunPipelineDrawer } from './RunPipelineDrawer';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <RunPipelineDrawer />
    </div>
  );
}

export default App;