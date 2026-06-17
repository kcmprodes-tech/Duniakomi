"use client";

import { useEffect } from "react";

// Menonaktifkan gesture swipe horizontal browser (two-finger swipe = previous/next /
// back-forward) selama di dalam game. Hanya aktif di layar besar (tablet/desktop) lewat
// matchMedia, jadi HP tidak terpengaruh. Diterapkan langsung sebagai inline style di
// <html> (root scroller) supaya andal lintas-browser tanpa bergantung pada pipeline CSS.
const MQ = "(min-width: 640px)";

export function NoSwipeNav() {
  useEffect(() => {
    const html = document.documentElement;
    const mql = window.matchMedia(MQ);
    const apply = () => {
      html.style.overscrollBehaviorX = mql.matches ? "none" : "";
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      html.style.overscrollBehaviorX = "";
    };
  }, []);
  return null;
}
