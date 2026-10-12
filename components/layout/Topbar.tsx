import { ProfileMenu } from "@/components/layout/ProfileMenu";
import type { TeamMember } from "@/lib/types";
import type { Weather } from "@/lib/weather";

export function Topbar({ member, weather }: { member: TeamMember; weather: Weather | null }) {
  return (
    <header className="sticky top-0 z-30 h-[72px] shrink-0 flex items-center justify-end gap-4 px-6 lg:px-8 bg-white/70 backdrop-blur border-b border-line">
      {weather && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white border border-line rounded-xl px-3.5 py-2">
          <span className="text-xl leading-none">{weather.emoji}</span>
          <div className="leading-tight">
            <div className="text-[10px] text-black/40">İstanbul</div>
            <div className="text-sm font-medium">{weather.temp}°</div>
          </div>
          <div className="text-[11px] text-mute leading-tight">
            <div>{weather.label}</div>
            <div>↑{weather.tempMax}° ↓{weather.tempMin}°</div>
          </div>
        </div>
      )}
      <ProfileMenu member={member} />
    </header>
  );
}
