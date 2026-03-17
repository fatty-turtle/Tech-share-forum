import IconProps from "../icon.base";
import { useState } from "react";
export default function ThumbIcon({
  size = 16,
  className = "",
  onClick,
}: IconProps) {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
    onClick?.();
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={liked ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-pointer transition-colors duration-200 ${
        liked ? "text-foreground" : "text-gray-400 hover:text-foreground"
      } ${className}`}
      onClick={handleClick}
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
