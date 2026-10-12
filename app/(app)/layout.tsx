import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { NoAccess } from "@/components/layout/NoAccess";
import { getSession } from "@/lib/auth";
import { getIstanbulWeather } from "@/lib/weather";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [{ user, member }, weather] = await Promise.all([getSession(), getIstanbulWeather()]);
  if (!user) redirect("/login");
  if (!member) return <NoAccess email={user.email ?? ""} />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar member={member} weather={weather} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
