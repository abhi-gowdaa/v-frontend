import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const RunPipelineDrawer = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const response = await fetch("http://localhost:8000/pipelines/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges, input }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setOutput(data.output);
      } else {
        setError(data.detail || "Failed to execute pipeline");
      }
    } catch (err) {
      setError("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
  variant="contained"
  onClick={() => setOpen(true)}
  sx={{
    position: "fixed",
    top: 20,
    right: 380,
    zIndex: 1000,
    background: "#4B5563", // neutral gray
    color: "#fff",
    fontWeight: 600,
    py: 1.2,
    px: 3,
    textTransform: 'none',
    fontSize: 15,
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    "&:hover": { background: "#374151", boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }
  }}
>
  Run Pipeline
</Button>


      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 450, p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>Execute Pipeline</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <TextField
            label="Input Text"
            multiline
            rows={6}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input text here..."
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            onClick={handleRun}
            disabled={loading || !input.trim()}
            sx={{
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: 15,
              background: "#6366F1",
              "&:hover": { background: "#5558E3" }
            }}
          >
            {loading ? "Processing..." : "Execute"}
          </Button>

          {error && (
            <Paper sx={{ mt: 3, p: 2, bgcolor: "#e64358ff", color: "white" }}>
              <Typography fontWeight={600}>{error}</Typography>
            </Paper>
          )}

          {output && (
            <Paper sx={{ mt: 3, p: 3, flex: 1, overflow: "auto", bgcolor: "#f5f5f5" }}>
              <Typography variant="subtitle2" fontWeight={700} color="primary" mb={1}>
                Output:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {output}
              </Typography>
            </Paper>
          )}
        </Box>
      </Drawer>
    </>
  );
};