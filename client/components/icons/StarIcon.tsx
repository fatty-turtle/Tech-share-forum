import IconProps from "../icon.base";
export default function StarIcon({
  size = 16,
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
      <circle cx="12" cy="12" r="10" />
      <polygon
        points="12 8 13.5 11 17 11.3 14.5 13.7 15.3 17 12 15.2 8.7 17 9.5 13.7 7 11.3 10.5 11"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
