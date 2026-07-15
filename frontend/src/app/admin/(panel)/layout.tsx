import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminMobileBar, AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-dvh">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminMobileBar />
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
