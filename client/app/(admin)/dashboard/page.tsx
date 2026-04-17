export default function Dashboard() {
  return (
    <section className="flex flex-col gap-7 p-4 h-screen flex-6">
      <article>
        <h1>Dashboard Overview</h1>
        <p>Real-time pulse of the TechShare editorial ecosystem.</p>
      </article>
      <article className=" flex flex-row justify-evenly gap-4 text-center">
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Total Members</p>
          <h1>45K</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Total Posts</p>
          <h1>12K</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>New Users Today</p>
          <h1>150</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Tag Made</p>
          <h1>30</h1>
        </div>
      </article>
      <article>
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          <h1>Recent Activity</h1>
          <div className="flex flex-row gap-3">
            <button>Filter</button>
            <button>View All</button>
          </div>
        </div>
        <table className="w-full bg-box rounded-2xl p-4">
          <tr className="bg-gray-200 h-18 ">
            <th>Post Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="text-center h-18">
            <td>some thing</td>
            <td>some one</td>
            <td>some date</td>
            <td className="text-center space-x-2">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </table>
      </article>
    </section>
  );
}
