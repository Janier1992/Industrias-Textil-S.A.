export function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span className="badge" style={{ background: bg, color }}>
      {label}
    </span>
  );
}
