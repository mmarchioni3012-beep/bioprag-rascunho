import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso restrito | BIOPRAG" },
      { name: "description", content: "Área interna da BIOPRAG para gestão de leads e atendimentos comerciais." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Acesso restrito | BIOPRAG" },
      { property: "og:description", content: "Área interna da BIOPRAG para gestão de leads." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/leads", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    navigate({ to: "/admin/leads", replace: true });
  };

  const field =
    "w-full rounded-lg border border-[#1C3D22] bg-[#08150D] px-4 py-3 text-sm text-[#F0F4F0] outline-none transition-colors placeholder:text-[#5D765F] focus:border-[#2ECC71]";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1A0F] px-4 text-[#F0F4F0]">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-[#1C3D22] bg-[#0B1D11] p-8">
        <h1 className="font-display text-2xl font-extrabold">Acesso interno</h1>
        <p className="mt-2 text-sm text-[#8FA98F]">Gestão de leads BIOPRAG.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8FA98F]">
              E-mail
            </label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8FA98F]">
              Senha
            </label>
            <input
              id="auth-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#2ECC71] px-4 py-3 text-sm font-semibold text-[#06180D] transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
