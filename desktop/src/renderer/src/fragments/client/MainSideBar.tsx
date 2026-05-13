import { actions, authens } from "./config";
export default function ClientSideBar() {
  return (
    <aside
      className="bg-background-box shadow w-60 sticky top-3 bottom-3 rounded-2xl p-3 flex flex-col gap-5"
      id="box"
    >
      <nav>
        <ul className="flex flex-col gap-2">
          {actions.map((action) => (
            <li className="hover:bg-background hover:shadow rounded-xl">
              <a
                href={action.route}
                className="w-full h-10 pl-5 flex gap-3 items-center font-bold "
              >
                {action.icon} {action.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        <ul className="flex flex-col gap-3 ">
          {authens.map((authen) => (
            <li className="bg-foreground text-background-box hover:bg-background-box hover:text-foreground hover:shadow rounded-xl">
              <a
                href={authen.route}
                className="w-full h-10 pl-5 flex gap-3 items-center font-bold"
              >
                {authen.icon} {authen.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
