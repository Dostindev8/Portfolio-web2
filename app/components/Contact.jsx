"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Clock,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  Shield,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";
import { SOCIAL } from "@/lib/brand";

/** @typedef {'idle'|'submitting'|'success'|'error'} SendState */

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition placeholder:text-[var(--fg-muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60";

export default function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const reduceMotion = useReducedMotion();
  /** @type {[SendState, Function]} */
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const ms = status === "success" ? 2500 : 3200;
    const timer = setTimeout(() => {
      setStatus("idle");
      setResult("");
    }, ms);
    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setResult(c.sending);
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${c.emailValue}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );
      if (response.ok) {
        setStatus("success");
        setResult(c.success);
        form.reset();
      } else {
        setStatus("error");
        setResult(c.error);
      }
    } catch {
      setStatus("error");
      setResult(c.error);
    }
  };

  const btnLabel =
    status === "submitting"
      ? c.sending
      : status === "success"
        ? c.successShort || c.success
        : status === "error"
          ? c.errorShort || c.error
          : c.send;

  const btnClass =
    status === "success"
      ? "bg-emerald-600 hover:bg-emerald-600"
      : status === "error"
        ? "bg-red-600 hover:bg-red-600"
        : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-lg shadow-blue-500/25";

  const features = [
    { icon: Zap, label: c.features?.fast },
    { icon: Sparkles, label: c.features?.custom },
    { icon: Lock, label: c.features?.privacy },
    { icon: Shield, label: c.features?.support },
  ].filter((f) => f.label);

  return (
    <section id="contactme" className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:items-start lg:gap-12">
        {/* Left — info */}
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-fluid-h2 text-[var(--fg)]">
            {c.titleBefore}{" "}
            <span className="text-[var(--accent)]">{c.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-md text-fluid-body text-[var(--fg-muted)]">
            {c.subtitle}
          </p>

          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={`mailto:${c.emailValue}`}
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition hover:border-[var(--accent)]"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Mail size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-medium text-[var(--fg)] break-all">
                    {c.emailValue}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                    {c.emailHint}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition hover:border-[var(--accent)]"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Phone size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-medium text-[var(--fg)]">
                    {c.phone}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                    {c.phoneHint}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MapPin size={18} aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-medium text-[var(--fg)]">
                  {c.location}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                  {c.locationHint}
                </span>
              </span>
            </li>
          </ul>

          <a
            href={SOCIAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--bg-elevated)] p-5 shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_22%,transparent)] transition hover:border-[var(--accent)]"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <Rocket size={18} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--fg)]">{c.readyTitle}</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">{c.readySub}</p>
              </div>
            </div>
          </a>
        </SectionReveal>

        {/* Right — form */}
        <SectionReveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow)] sm:p-7"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="Portfolio contact — Dostin Santana"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 flex items-center gap-1.5 text-[var(--fg-muted)]">
                  <User size={14} aria-hidden />
                  {c.name}
                </span>
                <input
                  name="name"
                  required
                  minLength={2}
                  disabled={status === "submitting"}
                  placeholder={c.namePlaceholder}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 flex items-center gap-1.5 text-[var(--fg-muted)]">
                  <Mail size={14} aria-hidden />
                  {c.email}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={status === "submitting"}
                  placeholder={c.emailPlaceholder}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-4 block text-sm">
              <span className="mb-1.5 flex items-center gap-1.5 text-[var(--fg-muted)]">
                <MessageSquare size={14} aria-hidden />
                {c.subject}
              </span>
              <input
                name="subject"
                required
                minLength={3}
                disabled={status === "submitting"}
                placeholder={c.subjectPlaceholder}
                className={inputClass}
              />
            </label>

            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block text-[var(--fg-muted)]">{c.projectType}</span>
              <select
                name="project_type"
                required
                disabled={status === "submitting"}
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  {c.projectTypePlaceholder}
                </option>
                {(c.projectTypes || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm">
              <span className="mb-1.5 flex items-center gap-1.5 text-[var(--fg-muted)]">
                <Clock size={14} aria-hidden />
                {c.timeline}
              </span>
              <input
                type="text"
                name="timeline"
                disabled={status === "submitting"}
                placeholder={c.timelinePlaceholder}
                className={inputClass}
              />
            </label>

            {/* CTA cotización — sin precios públicos */}
            <div className="mt-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3.5">
              <p className="text-sm text-[var(--fg)]">{c.quoteCta}</p>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition hover:underline"
              >
                {c.quoteWhatsapp}
                <Send size={14} aria-hidden />
              </a>
            </div>

            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block text-[var(--fg-muted)]">{c.message}</span>
              <textarea
                name="message"
                required
                minLength={10}
                rows={5}
                disabled={status === "submitting"}
                placeholder={c.messagePlaceholder}
                className={`${inputClass} resize-y`}
              />
            </label>

            {features.length > 0 && (
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {features.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--fg-muted)] sm:text-xs"
                  >
                    <Icon size={14} className="shrink-0 text-[var(--accent)]" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            )}

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              animate={
                status === "success" && !reduceMotion
                  ? { scale: [1, 1.04, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.35 }}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${btnClass}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status + "-icon"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.2 }}
                  className="inline-flex"
                >
                  {status === "submitting" && (
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                  )}
                  {status === "success" && <Check size={16} aria-hidden />}
                  {status === "error" && <AlertCircle size={16} aria-hidden />}
                  {status === "idle" && <Send size={16} aria-hidden />}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status + "-label"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
                >
                  {btnLabel}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <p
              className="mt-3 min-h-6 text-center text-sm text-[var(--fg-muted)]"
              aria-live="polite"
            >
              {result}
            </p>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
