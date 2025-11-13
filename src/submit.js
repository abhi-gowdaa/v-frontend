import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch("https://v-backend-vl29.onrender.com/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      setResult(await response.json());
    } catch (error) {
      setResult({ error: "Failed to connect to backend" });
    }
  };

  return (
    <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000, display: "flex", flexDirection: "column", gap: 2, maxWidth: 320 }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          background: "#643bb0ff",
          py: 1.2,
          px: 3,
          fontWeight: 600,
          borderRadius: 2,
          fontSize: 15,
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
          "&:hover": { background: "#5558E3", boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }
        }}
      >
        Submit Pipelines
      </Button>

      {result && !result.error && (
        <Paper
          elevation={8}
          sx={{
            p: 3,
            bgcolor: "rgba(0,0,0,0.75)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
            <Chip label={`Nodes: ${result.num_nodes}`} sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 600 }} />
            <Chip label={`Edges: ${result.num_edges}`} sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 600 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center", fontSize: 16, fontWeight: 600 }}>
            {result.is_dag ? <CheckCircleIcon /> : <CancelIcon />}
            {result.is_dag ? "Valid DAG ✓" : "Cycle Detected ✗"}
          </Box>
        </Paper>
      )}

      {result?.error && (
        <Paper elevation={3} sx={{ p: 2, color: "white", fontWeight: 500 }}>
          {result.error}
        </Paper>
      )}
    </Box>
  );
};
