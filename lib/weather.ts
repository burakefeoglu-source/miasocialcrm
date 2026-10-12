// İstanbul hava durumu — Open-Meteo, anahtar gerektirmez.
const LABELS: Record<number, [string, string]> = {
  0: ["Açık", "☀️"], 1: ["Az bulutlu", "🌤️"], 2: ["Parçalı bulutlu", "⛅"], 3: ["Kapalı", "☁️"],
  45: ["Sisli", "🌫️"], 48: ["Sisli", "🌫️"], 51: ["Çisenti", "🌦️"], 61: ["Yağmurlu", "🌧️"],
  63: ["Yağmurlu", "🌧️"], 65: ["Sağanak", "🌧️"], 71: ["Karlı", "🌨️"], 80: ["Sağanak", "🌦️"], 95: ["Fırtınalı", "⛈️"],
};

export interface Weather {
  temp: number;
  tempMax: number;
  tempMin: number;
  label: string;
  emoji: string;
}

export async function getIstanbulWeather(): Promise<Weather | null> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul&forecast_days=1",
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return null;
    const d = await res.json();
    const [label, emoji] = LABELS[d.current?.weather_code ?? 0] ?? ["", "🌡️"];
    return {
      temp: Math.round(d.current.temperature_2m),
      tempMax: Math.round(d.daily.temperature_2m_max[0]),
      tempMin: Math.round(d.daily.temperature_2m_min[0]),
      label,
      emoji,
    };
  } catch {
    return null;
  }
}
