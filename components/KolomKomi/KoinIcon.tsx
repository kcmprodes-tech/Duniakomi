// Ikon koin kartun (uang receh) — dipakai di semua tampilan koin Kolom Komi.
// Bukan emoji, jadi rupanya konsisten di semua perangkat.
export function KoinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={"shrink-0 " + className}
    >
      <circle cx="12" cy="12" r="11" fill="#fffaf0" />
      <circle cx="12" cy="12" r="10" fill="#f2b01e" stroke="#9a5f08" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="7.4" fill="#ffcc44" stroke="#ffe39a" strokeWidth="1.4" />
      <path d="M7.7 8.4 Q9.3 6.3 12 6.2" stroke="#fff7d6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
