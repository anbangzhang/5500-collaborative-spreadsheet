import React from "react";

// a component that will render a single cell
// the cell has a class name
// the cell has a click handler
// the cell has a style
// the cell has a value
// the cell has a label
// the cell has an editor name

interface CellProps {
  value: string;
  label: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style: React.CSSProperties;
  editorName?: string; // hidden or shown based on the presence of this property 
}

function Cell({ value, label, className, onClick, style, editorName }: CellProps) {
  return (
    <button className={className} onClick={onClick} style={style} value={value}>
      {label}
      {editorName && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add a background color for better visibility
            padding: '4px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {editorName}
        </div>
      )}
    </button>
  );
}

export default Cell;