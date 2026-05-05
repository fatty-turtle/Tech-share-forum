import IconProps from "../icon.base";
export default function HammerIcon({
  size = 20,
  className = "",
  onClick,
}: IconProps){
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
    <path
      d="M0 19V17H12V19H0V19M5.65 14.15L0 8.5L2.1 6.35L7.8 12L5.65 14.15V14.15M12 7.8L6.35 2.1L8.5 0L14.15 5.65L12 7.8V7.8M16.6 18L3.55 4.95L4.95 3.55L18 16.6L16.6 18V18"
    />
    </svg>
  );
}