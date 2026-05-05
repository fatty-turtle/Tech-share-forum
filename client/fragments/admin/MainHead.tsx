import SearchBar from "@/components/general/SearchBar";
import BellIcon from "@/components/icons/BellIcon";
export default function AdminHead() {
  return (
    <header className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 border-b border-gray-200">
      <div className="flex flex-1 lg:flex-9 justify-center lg:justify-between items-center p-4 sm:p-6 border-b lg:border-r border-gray-200 mb-4 lg:mb-0 lg:mr-4">
        <SearchBar placeholder="Search for users, posts, or reports..." />
        <BellIcon
          size={20}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
        />
      </div>
      <div className="flex flex-1 items-center gap-4 p-4">
        <h3>Admin</h3>
        <img src="/path/to/admin-avatar.png" alt="Admin Avatar" />
      </div>
    </header>
  );
}
