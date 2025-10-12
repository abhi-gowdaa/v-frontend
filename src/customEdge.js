import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from 'reactflow';

export default function CustomEdge({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY,
  style = {},
  markerEnd
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* Outer glow layer - wider, very transparent */}
      <path
        id={`${id}-glow-outer`}
        d={edgePath}
        fill="none"
        stroke="rgba(255, 0, 80, 0.15)"
        strokeWidth={12}
        style={{
          filter: 'blur(8px)',
        }}
      />
      
      {/* Middle glow layer */}
      <path
        id={`${id}-glow-middle`}
        d={edgePath}
        fill="none"
        stroke="rgba(255, 20, 100, 0.4)"
        strokeWidth={4}
        style={{
          filter: 'blur(3px)',
        }}
      />
      
      {/* Inner bright core - thin line */}
      <path
        id={`${id}-core`}
        d={edgePath}
        fill="none"
        stroke="#ff0050"
        strokeWidth={1.5}
        style={{
          filter: 'drop-shadow(0 0 2px #ff0050)',
        }}
      />

      {/* Animated light trail */}
      <path
        id={`${id}-trail`}
        d={edgePath}
        fill="none"
        stroke="url(#tron-gradient)"
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          strokeDasharray: '20 80',
          animation: 'tron-flow 2s linear infinite',
        }}
      />

      {/* SVG Gradient Definition */}
      <defs>
        <linearGradient id="tron-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgba(255, 0, 80, 0)', stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: '#ff0050', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ff6699', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>

      {/* Delete button */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <button
            className="nodrag nopan"
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
            style={{
              width: '20px',
              height: '20px',
              background: 'rgba(20, 20, 30, 0.95)',
              border: '1.5px solid #ff0050',
              borderRadius: '50%',
              color: '#ff0050',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: '0 0 10px rgba(255, 0, 80, 0.5), inset 0 0 5px rgba(255, 0, 80, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ff0050';
              e.target.style.color = '#000';
              e.target.style.boxShadow = '0 0 15px rgba(255, 0, 80, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(20, 20, 30, 0.95)';
              e.target.style.color = '#ff0050';
              e.target.style.boxShadow = '0 0 10px rgba(255, 0, 80, 0.5), inset 0 0 5px rgba(255, 0, 80, 0.2)';
            }}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>

      {/* CSS Animation */}
      <style>{`
        @keyframes tron-flow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
}
