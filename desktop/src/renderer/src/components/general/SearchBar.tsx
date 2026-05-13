import SearchIcon from "../icons/SearchIcon";

interface SearchBarProps {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
  placeholder?: string;
  inputClassName?: string;
}

export default function SearchBar({
  className,
  iconSize,
  iconClassName,
  placeholder,
  inputClassName,
}: SearchBarProps) {
  return (
    <div
      className={
        className ||
        "flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-80 bg-white"
      }
    >
      <SearchIcon
        size={iconSize || 20}
        className={iconClassName || "text-gray-400 shrink-0"}
      />
      <input
        type="text"
        placeholder={placeholder || "Search by keyword..."}
        className={
          inputClassName ||
          "outline-none text-sm text-gray-400 w-full bg-transparent"
        }
      />
    </div>
  );
}
