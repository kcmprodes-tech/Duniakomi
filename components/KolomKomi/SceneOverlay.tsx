import { Spinner } from "./Loader";

// Overlay spinner yang menutupi seluruh scene sampai background image siap.
// Saat `show` jadi false, overlay memudar (fade-out) lalu transparan & non-aktif.
export function SceneOverlay({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden={!show}
      className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-cream transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Spinner />
    </div>
  );
}
