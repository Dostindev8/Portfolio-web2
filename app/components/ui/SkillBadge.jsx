export default function SkillBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs sm:text-sm text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]">
      {children}
    </span>
  );
}
