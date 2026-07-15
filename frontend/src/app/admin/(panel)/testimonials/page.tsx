import { ResourceManager } from "@/components/admin/resource-manager";
import { RESOURCES } from "@/lib/admin-resources";

export default function Page() {
  return <ResourceManager config={RESOURCES.testimonials} />;
}
