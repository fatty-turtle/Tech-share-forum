import FilterIcon from "@/components/icons/FilterIcon";
import AddFriendIcon from "@/components/icons/AddFriendIcon";
export default function UserManagement() {
  return (
    <section className="flex flex-col gap-7 h-screen flex-6">
      <article className="flex flex-row items-center justify-between gap-4">
        <div>
          <h1>User Management</h1>
          <p>Manage and oversee the TechShare community with ease.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 flex items-center gap-4 min-w-20 border-2 border-foreground rounded-2xl p-3 text-foreground">
            <FilterIcon />
            Filter
          </button>
          <button className="flex-1 flex items-center gap-4 min-w-45 bg-foreground text-box rounded-2xl p-3">
            <AddFriendIcon />
            Add New User
          </button>
        </div>
      </article>
      <article className="flex flex-row justify-evenly gap-4 text-center">
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <h2>TOTAL ACTIVE CONTRIBUTOR</h2>
          <h1>12,842</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <h2>MODERATOR</h2>
          <h1>120</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <h2>BANNED</h2>
          <h1>120</h1>
        </div>
      </article>
      <article>
        <table className="w-full bg-box rounded-2xl p-4">
          <thead>
            <tr className="bg-gray-200 h-18 ">
              <th>Post Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center h-18">
              <td>some thing</td>
              <td>some one</td>
              <td>some date</td>
              <td className="text-center space-x-2">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
