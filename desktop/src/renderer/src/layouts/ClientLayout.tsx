import { Outlet } from "react-router-dom";
import ClientHeader from "../fragments/client/MainHeader";
import ClientSideBar from "../fragments/client/MainSideBar";
export default function ClientLayout() {
  return (
    <>
      <ClientHeader></ClientHeader>
      <main className="flex justify-end gap-5">
        <ClientSideBar />
        <Outlet />
      </main>
    </>
  );
}
