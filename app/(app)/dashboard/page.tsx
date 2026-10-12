import Link from "next/link";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const { member } = await getSession();
  const steps = [
    { done: true, text: "Giriş sistemi hazır", href: null },
    { done: false, text: "Ekip üyelerini ekle", href: "/team" },
  ];

  return (
    <div className="max-w-3xl">
      <PageHeader title={`Merhaba, ${member?.name.split(" ")[0] ?? ""}`} description="Temel kuruldu. Sıradaki modüller bu panele eklenecek." />
      <Card>
        <h2 className="text-[15px] font-medium mb-4">Başlangıç</h2>
        <div className="flex flex-col gap-1">
          {steps.map((s) => {
            const row = (
              <div className="flex items-center gap-3 py-2.5">
                <IconCircleCheck size={20} className={s.done ? "text-green-600" : "text-black/20"} />
                <span className={`text-sm flex-1 ${s.done ? "text-mute line-through" : ""}`}>{s.text}</span>
                {s.href && <IconArrowRight size={15} className="text-black/35" />}
              </div>
            );
            return s.href ? (
              <Link key={s.text} href={s.href} className="rounded-xl px-2 -mx-2 hover:bg-black/[0.03]">{row}</Link>
            ) : (
              <div key={s.text} className="px-2 -mx-2">{row}</div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
