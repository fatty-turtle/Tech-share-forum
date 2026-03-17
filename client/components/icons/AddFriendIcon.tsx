import IconProps from "../icon.base";

export default function AddFriendIcon({
  size = 24,
  className = "",
  onClick,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
      {/* Person head */}
      <circle cx="10" cy="8" r="3.5" />
      {/* Person body */}
      <path d="M2 21v-1a8 8 0 0 1 13.5-5.8" />
      {/* Plus sign - top right */}
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
  );
}
