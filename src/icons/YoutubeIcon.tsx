import React from "react";

interface YoutubeIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  background?: string;
  opacity?: number;
  rotation?: number;
  shadow?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  className?: string;
}

const YoutubeIcon = ({
  size = "1em",
  color = "#000000",
  strokeWidth = 2,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  className = "",
}: YoutubeIconProps) => {
  const transforms = [
    rotation !== 0 ? `rotate(${rotation}deg)` : "",
    flipHorizontal ? "scaleX(-1)" : "",
    flipVertical ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 180"
      width={size}
      height={size}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{
        opacity,
        transform: transforms || undefined,
        filter:
          shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
        backgroundColor:
          background !== "transparent" ? background : undefined,
      }}
      aria-hidden="true"
    >
      <path
        fill="#FF0000"
        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
      />

      <path
        fill="#FFFFFF"
        d="m102.421 128.06 66.328-38.418-66.328-38.418v76.836Z"
      />
    </svg>
  );
};

export default YoutubeIcon;