import React from "react";

const Spinner = ({
  width = 120,
  height = 4,
  color = "var(--accent)",
  text,
  style = {},
}) => {
  const gradientId = "barGradient";
  const maskId = "barMask";

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
    >
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <mask id={maskId}>
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="white"
              rx={height / 2}
            />
          </mask>
          <rect
            id="bar"
            x="-100%"
            y="0"
            width="100%"
            height={height}
            fill={`url(#${gradientId})`}
          >
            <animate
              attributeName="x"
              from="-100%"
              to="100%"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </rect>
        </defs>
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={height / 2}
          fill="rgba(0,0,0,0.06)"
        />
        <use href="#bar" mask={`url(#${maskId})`} />
      </svg>
      {text && (
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Spinner;
