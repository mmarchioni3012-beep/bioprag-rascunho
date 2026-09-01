import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Modal/drawer acessível reutilizável (segmentos e serviços).
 * - fecha por X, Esc e clique fora
 * - bloqueia a rolagem do fundo
 * - move o foco ao abrir e devolve ao elemento de origem ao fechar
 */
export function InfoModal({
  title,
  eyebrow,
  onClose,
  children,
  footer,
}: {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const originRef = useRef<Element | null>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    originRef.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (originRef.current as HTMLElement | null)?.focus?.();
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden border-t border-[#1C3D22] bg-[#0F2415] sm:max-h-[88vh] sm:max-w-[680px] sm:rounded-2xl sm:border"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:px-7">
          <div className="min-w-0">
            {eyebrow && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2ECC71]">{eyebrow}</span>
            )}
            <h2 id="info-modal-title" className="mt-1 font-display text-xl font-bold leading-tight text-[#F0F4F0]">
              {title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="shrink-0 rounded-lg border border-[#1C3D22] p-2 text-[#8FA98F] transition-colors hover:text-[#F0F4F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2ECC71]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">{children}</div>

        {footer && (
          <footer
            className="border-t border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:px-7"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
