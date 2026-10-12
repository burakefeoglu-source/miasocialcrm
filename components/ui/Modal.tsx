"use client";

import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

export function Modal({
  title,
  onClose,
  children,
  width = "max-w-md",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />
      <div role="dialog" aria-label={title} className={`relative w-full ${width} max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-pop`}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 border-b border-line rounded-t-2xl">
          <h2 className="font-display text-lg font-medium">{title}</h2>
          <button onClick={onClose} aria-label="Kapat" className="w-8 h-8 flex items-center justify-center rounded-lg text-black/40 hover:bg-black/5">
            <IconX size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
