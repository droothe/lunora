import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, LayoutDashboard, Scissors, Users, LogOut, ArrowLeft, Check, X, CircleCheck } from "lucide-react";
import { useSalon, TIME_SLOTS, tl, type Status } from "@/lib/salon-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli — HAIRPORT Coiffure" },
      { name: "description", content: "HAIRPORT Coiffure randevu, hizmet ve müşteri yönetim paneli (demo)." },
      { property: "og:title", content: "Yönetim Paneli — HAIRPORT Coiffure" },
      { property: "og:description", content: "Randevu ve müşteri yönetimi demo paneli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const STATUS_STYLE: Record<Status, string> = {
  Bekliyor: "bg-warning/20 text-foreground",
  Onaylandı: "bg-info/20 text-foreground",
  Tamamlandı: "bg-success/20 text-foreground",
  İptal: "bg-destructive/15 text-destructive",
};

function Admin() {
  const [authed, setAuthed] = useState(false);
  return authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <Login onOk={() => setAuthed(true)} />;
}

function Login({ onOk }: { onOk: () => void }) {
  const [email, setEmail] = useState("admin@hairport.demo");
  const [pw, setPw] = useState("123456");
  const [err, setErr] = useState("");
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={(e) => { e.preventDefault(); if (email === "admin@hairport.demo" && pw === "123456") onOk(); else setErr("Bilgiler hatalı."); }}
        className="fade-up w-full max-w-sm rounded-3xl border bg-card p-8 shadow-lift">
        <p className="font-serif text-3xl tracking-[0.25em]">HAIRPORT</p>
        <p className="eyebrow mt-1">Yönetim Paneli</p>
        <div className="mt-8 space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent" placeholder="E-posta" />
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Şifre" />
        </div>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <button className="mt-6 w-full rounded-full bg-primary py-3 text-sm text-primary-foreground">Giriş Yap</button>
        <div className="mt-6 rounded-xl bg-secondary p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Demo Giriş Bilgileri</p>
          <p>admin@hairport.demo / 123456</p>
        </div>
        <Link to="/" className="mt-6 flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Siteye dön</Link>
      </form>
    </div>
  );
}

const TABS = [
  ["overview", "Genel Bakış", LayoutDashboard],
  ["calendar", "Takvim", CalendarDays],
  ["services", "Hizmetler", Scissors],
  ["crm", "Müşteriler", Users],
] as const;

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("overview");
  return (
    <div className="min-h-screen lg:flex">
      <aside className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:flex-col lg:items-stretch lg:justify-start lg:p-8">
        <div>
          <p className="font-serif text-2xl tracking-[0.25em]">HAIRPORT</p>
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">Admin</p>
        </div>
        <nav className="mt-10 hidden flex-col gap-1 lg:flex">
          {TABS.map(([k, l, I]) => (
            <button key={k} onClick={() => setTab(k)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${tab === k ? "bg-primary-foreground/10" : "opacity-70 hover:opacity-100"}`}><I className="h-4 w-4" />{l}</button>
          ))}
        </nav>
        <div className="flex gap-2 lg:mt-auto lg:flex-col">
          <Link to="/" className="rounded-xl px-3 py-2 text-xs opacity-70 hover:opacity-100">Siteyi Gör</Link>
          <button onClick={onLogout} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs opacity-70 hover:opacity-100"><LogOut className="h-3 w-3" /> Çıkış</button>
        </div>
      </aside>
      <div className="flex gap-1 overflow-x-auto border-b bg-card px-3 py-2 lg:hidden">
        {TABS.map(([k, l, I]) => (
          <button key={k} onClick={() => setTab(k)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs ${tab === k ? "bg-primary text-primary-foreground" : ""}`}><I className="h-3.5 w-3.5" />{l}</button>
        ))}
      </div>
      <main className="flex-1 p-5 lg:p-10">
        {tab === "overview" && <Overview />}
        {tab === "calendar" && <CalendarView />}
        {tab === "services" && <ServiceManager />}
        {tab === "crm" && <CRM />}
      </main>
    </div>
  );
}

function Title({ t, s }: { t: string; s: string }) {
  return <div className="mb-8"><p className="eyebrow">{s}</p><h1 className="mt-2 text-4xl lg:text-5xl">{t}</h1></div>;
}

function Overview() {
  const { appointments, services, setStatus } = useSalon();
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  const metrics = [
    ["Bugünkü Randevular", appointments.filter((a) => a.date === today && a.status !== "İptal").length],
    ["Bekleyen Randevular", appointments.filter((a) => a.status === "Bekliyor").length],
    ["Toplam Müşteri", new Set(appointments.map((a) => a.phone)).size],
    ["Aylık Ciro", tl(appointments.filter((a) => a.date.startsWith(month) && a.status !== "İptal").reduce((s, a) => s + a.total, 0))],
  ];
  const sorted = [...appointments].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const name = (ids: string[]) => ids.map((i) => services.find((s) => s.id === i)?.name).join(", ");
  return (
    <>
      <Title s="Genel Bakış" t="Günaydın, Pınar." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map(([l, v]) => (
          <div key={l as string} className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="mt-3 font-serif text-3xl lg:text-4xl">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-soft">
        <div className="border-b px-5 py-4"><h2 className="text-2xl">Randevular</h2></div>
        <div className="divide-y">
          {sorted.map((a) => (
            <div key={a.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
              <div className="w-28 shrink-0">
                <p className="font-serif text-xl">{a.time}</p>
                <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium">{a.customer} {a.privateSection && <span className="ml-1 text-xs">🧕</span>}</p>
                <p className="text-xs text-muted-foreground">{name(a.serviceIds)} · {a.specialist} · {a.ref}</p>
              </div>
              <p className="font-serif text-lg">{tl(a.total)}</p>
              <span className={`rounded-full px-3 py-1 text-xs ${STATUS_STYLE[a.status]}`}>{a.status}</span>
              <div className="flex gap-1">
                <IconBtn label="Onayla" onClick={() => setStatus(a.id, "Onaylandı")}><Check className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn label="Tamamlandı" onClick={() => setStatus(a.id, "Tamamlandı")}><CircleCheck className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn label="İptal Et" onClick={() => setStatus(a.id, "İptal")}><X className="h-3.5 w-3.5" /></IconBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button title={label} aria-label={label} onClick={onClick} className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition hover:bg-secondary">{children}<span className="hidden xl:inline">{label}</span></button>;
}

function CalendarView() {
  const { appointments } = useSalon();
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; });
  return (
    <>
      <Title s="Canlı Takvim" t="Bu Hafta" />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <div className="grid min-w-[760px] grid-cols-[64px_repeat(7,1fr)]">
          <div />
          {days.map((d) => <div key={d.toISOString()} className="border-b border-l p-3 text-center"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.toLocaleDateString("tr-TR", { weekday: "short" })}</p><p className="font-serif text-xl">{d.getDate()}</p></div>)}
          {TIME_SLOTS.map((t) => (
            <div key={t} className="contents">
              <div className="border-b p-2 text-xs text-muted-foreground">{t}</div>
              {days.map((d) => {
                const a = appointments.find((x) => x.date === d.toISOString().slice(0, 10) && x.time === t && x.status !== "İptal");
                return (
                  <div key={d.toISOString() + t} className="h-14 border-b border-l p-1">
                    {a && <div className={`h-full rounded-lg px-2 py-1 text-[11px] ${STATUS_STYLE[a.status]}`}><p className="truncate font-medium">{a.customer}</p><p className="truncate opacity-70">{a.status}</p></div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {(["Bekliyor", "Onaylandı", "Tamamlandı"] as Status[]).map((s) => <span key={s} className={`rounded-full px-3 py-1 ${STATUS_STYLE[s]}`}>{s}</span>)}
      </div>
    </>
  );
}

function ServiceManager() {
  const { services, updateService } = useSalon();
  return (
    <>
      <Title s="Hizmet & Fiyat" t="Hizmet Yönetimi" />
      <p className="-mt-4 mb-6 text-sm text-muted-foreground">Değişiklikler sitedeki hizmet menüsüne anında yansır.</p>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-soft md:flex-row md:items-center">
            <img src={s.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <input value={s.name} onChange={(e) => updateService(s.id, { name: e.target.value })} className="flex-1 rounded-xl border bg-background px-3 py-2 font-serif text-lg outline-none focus:border-accent" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">Süre
              <input type="number" value={s.duration} onChange={(e) => updateService(s.id, { duration: +e.target.value })} className="w-20 rounded-xl border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent" /> dk</label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">Fiyat ₺
              <input type="number" value={s.price} onChange={(e) => updateService(s.id, { price: +e.target.value })} className="w-28 rounded-xl border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent" /></label>
          </div>
        ))}
      </div>
    </>
  );
}

function CRM() {
  const { appointments, services } = useSalon();
  const customers = useMemo(() => {
    const m = new Map<string, typeof appointments>();
    appointments.forEach((a) => m.set(a.phone, [...(m.get(a.phone) ?? []), a]));
    return [...m.values()];
  }, [appointments]);
  return (
    <>
      <Title s="Müşteri CRM" t="Müşteriler" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((list) => {
          const c = list[0];
          const spent = list.filter((a) => a.status !== "İptal").reduce((s, a) => s + a.total, 0);
          return (
            <div key={c.phone} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/30 font-serif text-lg">{c.customer[0]}</div>
                <div><p className="font-medium">{c.customer}</p><p className="text-xs text-muted-foreground">{c.phone} · {c.email}</p></div>
              </div>
              <div className="mt-4 flex gap-4 text-xs"><span><b className="font-serif text-lg">{list.length}</b> randevu</span><span><b className="font-serif text-lg">{tl(spent)}</b> harcama</span></div>
              {(list.some((a) => a.privateSection) || list.some((a) => a.notes)) && (
                <div className="mt-3 rounded-xl bg-secondary p-3 text-xs">
                  <p className="font-medium">Tercihler</p>
                  {list.some((a) => a.privateSection) && <p>🧕 Özel tesettür bölümü</p>}
                  {list.filter((a) => a.notes).map((a) => <p key={a.id} className="text-muted-foreground">{a.notes}</p>)}
                </div>
              )}
              <div className="mt-3 space-y-1 text-xs">
                {list.map((a) => (
                  <div key={a.id} className="flex justify-between border-t pt-1"><span className="text-muted-foreground">{new Date(a.date).toLocaleDateString("tr-TR")}</span><span className="truncate px-2">{a.serviceIds.map((i) => services.find((s) => s.id === i)?.name).join(", ")}</span><span>{a.status}</span></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
