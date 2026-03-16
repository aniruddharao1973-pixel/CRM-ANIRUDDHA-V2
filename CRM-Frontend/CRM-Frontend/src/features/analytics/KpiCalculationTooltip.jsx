// src/features/analytics/KpiCalculationTooltip.jsx

import { useEffect, useRef } from "react";

export default function KpiCalculationTooltip({ children, open, onClose }) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose && onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="
  absolute left-1/2 bottom-full mb-3
  -translate-x-1/2

  w-80 rounded-2xl
  border border-slate-200
  bg-white/95 backdrop-blur-xl

  shadow-[0_18px_45px_rgba(15,23,42,0.25)]
  ring-1 ring-slate-200/50

  p-5 text-sm text-slate-700
  z-[9999]
"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/40 via-transparent to-sky-50/40 pointer-events-none" />

      <div className="relative z-10 space-y-2 leading-relaxed">{children}</div>

      {/* Arrow */}
      <div
        className="
    absolute left-1/2 top-full
    h-4 w-4 -translate-x-1/2
    rotate-45 bg-white
    border-r border-b border-slate-200
  "
      />
    </div>
  );
}
