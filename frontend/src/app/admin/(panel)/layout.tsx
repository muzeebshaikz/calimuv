import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />
        <div className="h-dvh flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6 lg:p-10">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
