import AdminHeader from "@/fragments/admin/AdminHeader";
import AdminHead from "@/fragments/admin/MainHead";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <div className="flex-5 mr-5">
        <AdminHead />
        {children}
      </div>
    </>
  );
}
