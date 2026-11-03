import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, LayoutDashboard, Scissors, Users, LogOut, ArrowLeft, Check, X, CircleCheck, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalonModal } from "@/components/site/SalonModal";
import { dateKey } from "@/lib/booking-rules";
import { useSalon, TIME_SLOTS, tl, type Status, type Appointment } from "@/lib/salon-store";

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
          <input aria-label="E-posta" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent" placeholder="E-posta" />
          <input aria-label="Şifre" autoComplete="current-password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Şifre" />
        </div>
        {err && <p role="alert" className="mt-3 text-sm text-destructive">{err}</p>}
        <Button variant="editorial" size="auto" className="mt-6 w-full rounded-full bg-primary py-3 text-sm text-primary-foreground">Giriş Yap</Button>
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
            <Button variant="editorial" size="auto" key={k} onClick={() => setTab(k)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${tab === k ? "bg-primary-foreground/10" : "opacity-70 hover:opacity-100"}`}><I className="h-4 w-4" />{l}</Button>
          ))}
        </nav>
        <div className="flex gap-2 lg:mt-auto lg:flex-col">
          <Link to="/" className="rounded-xl px-3 py-2 text-xs opacity-70 hover:opacity-100">Siteyi Gör</Link>
          <Button variant="editorial" size="auto" onClick={onLogout} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs opacity-70 hover:opacity-100"><LogOut className="h-3 w-3" /> Çıkış</Button>
        </div>
      </aside>
      <div className="flex gap-1 overflow-x-auto border-b bg-card px-3 py-2 lg:hidden">
        {TABS.map(([k, l, I]) => (
          <Button variant="editorial" size="auto" key={k} onClick={() => setTab(k)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs ${tab === k ? "bg-primary text-primary-foreground" : ""}`}><I className="h-3.5 w-3.5" />{l}</Button>
        ))}
      </div>
      <main className="min-w-0 flex-1 p-5 lg:p-10">
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
  const today = dateKey(new Date());
  const month = today.slice(0, 7);
  const metrics = [
    ["Bugünkü Randevular", appointments.filter((a) => a.date === today && a.status !== "İptal").length],
    ["Bekleyen Randevular", appointments.filter((a) => a.status === "Bekliyor").length],
    ["Toplam Müşteri", new Set(appointments.map((a) => a.phone)).size],
    ["Aylık Ciro", tl(appointments.filter((a) => a.date.startsWith(month) && a.status !== "İptal").reduce((s, a) => s + a.total, 0))],
  ];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const sorted = [...appointments].filter((a) => (filter === "Tümü" || a.status === filter) && `${a.customer} ${a.ref} ${a.phone}`.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
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
        <div className="flex flex-wrap items-center gap-3 border-b px-5 py-4"><h2 className="mr-auto text-2xl">Randevular</h2><input aria-label="Randevu ara" placeholder="İsim veya referans ara" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-full rounded-lg border bg-background px-3 py-2 text-sm" /><select aria-label="Randevu durumu" value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border bg-background p-2 text-sm">{["Tümü", "Bekliyor", "Onaylandı", "Tamamlandı", "İptal"].map((value) => <option key={value}>{value}</option>)}</select></div>
        <div className="divide-y">
          {!sorted.length && <p className="p-6 text-sm text-muted-foreground">Randevu bulunamadı.</p>}
          {sorted.map((a) => (
            <div key={a.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
              <div className="w-28 shrink-0">
                <p className="font-serif text-xl">{a.time}</p>
                <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</p>
              </div>
              <div className="flex-1">
                <Button variant="editorial" size="auto" onClick={() => setSelected(a)} className="justify-start text-left font-medium">{a.customer} {a.privateSection && <span className="ml-1 text-xs">🧕</span>}</Button>
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
      <AppointmentDetails appointment={selected ? appointments.find((a) => a.id === selected.id) ?? null : null} onClose={() => setSelected(null)} />
    </>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <Button variant="editorial" size="auto" title={label} aria-label={label} onClick={onClick} className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition hover:bg-secondary">{children}<span className="hidden xl:inline">{label}</span></Button>;
}

function AppointmentDetails({ appointment: a, onClose }: { appointment: Appointment | null; onClose: () => void }) {
  const { services, setStatus } = useSalon();
  return <SalonModal open={!!a} onClose={onClose} title="Randevu Detayı" className="max-w-lg p-6 pt-12">
    {a && <div className="overflow-y-auto">
      <p className="eyebrow">{a.ref}</p><h2 className="mt-2 text-3xl">{a.customer}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{new Date(`${a.date}T12:00:00`).toLocaleDateString("tr-TR")} · {a.time} · {a.duration} dk</p>
      <div className="my-5 space-y-3 border-y py-5 text-sm"><p>{a.specialist}</p><p>{a.serviceIds.map((id) => services.find((s) => s.id === id)?.name).join(", ")}</p><p>{a.phone} {a.email && `· ${a.email}`}</p>{a.privateSection && <p>Özel Tesettür Bölümü</p>}{a.notes && <p>{a.notes}</p>}<p className="font-serif text-2xl">{tl(a.total)}</p><p>{a.status}</p></div>
      <div className="flex flex-wrap gap-2"><IconBtn label="Onayla" onClick={() => setStatus(a.id, "Onaylandı")}><Check /></IconBtn><IconBtn label="Tamamlandı" onClick={() => setStatus(a.id, "Tamamlandı")}><CircleCheck /></IconBtn><IconBtn label="İptal Et" onClick={() => setStatus(a.id, "İptal")}><X /></IconBtn></div>
    </div>}
  </SalonModal>;
}

function CalendarView() {
  const { appointments, openBooking } = useSalon();
  const [offset, setOffset] = useState(0);
  const [mode, setMode] = useState<"day" | "week">("day");
  const [selected, setSelected] = useState<string | null>(null);
  const days = Array.from({ length: mode === "day" ? 1 : 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + offset + i); return d; });
  const first = days[0];
  return <>
    <Title s="Canlı Takvim" t="Randevu Takvimi" />
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" aria-label="Önceki tarih" onClick={() => setOffset((x) => x - (mode === "day" ? 1 : 7))}><ChevronLeft /></Button>
      <Button variant="outline" size="icon" aria-label="Sonraki tarih" onClick={() => setOffset((x) => x + (mode === "day" ? 1 : 7))}><ChevronRight /></Button>
      <Button variant="outline" onClick={() => setOffset(0)}>Bugün</Button>
      <p className="mr-auto text-sm">{first?.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
      <Button variant={mode === "day" ? "default" : "outline"} onClick={() => setMode("day")}>Gün</Button><Button variant={mode === "week" ? "default" : "outline"} onClick={() => setMode("week")}>Hafta</Button>
      <Button variant="secondary" onClick={() => openBooking()}>Yeni Randevu</Button>
    </div>
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
      <div className={mode === "week" ? "grid min-w-[850px] grid-cols-[64px_repeat(7,1fr)]" : "grid grid-cols-[64px_1fr]"}>
        <div />{days.map((d) => <div key={dateKey(d)} className="border-b border-l p-3 text-center"><p className="text-xs text-muted-foreground">{d.toLocaleDateString("tr-TR", { weekday: "long" })}</p><p className="font-serif text-xl">{d.getDate()}</p></div>)}
        {TIME_SLOTS.map((t) => <div key={t} className="contents"><div className="border-b p-2 text-xs text-muted-foreground">{t}</div>{days.map((d) => {
          const list = appointments.filter((a) => a.date === dateKey(d) && a.time === t && a.status !== "İptal");
          return <div key={dateKey(d) + t} className="min-h-16 space-y-1 border-b border-l p-1">{list.map((a) => <Button key={a.id} variant="editorial" size="auto" onClick={() => setSelected(a.id)} className={`block w-full rounded-lg px-2 py-2 text-left text-xs ${STATUS_STYLE[a.status]}`}><span className="block truncate font-medium">{a.customer}</span><span className="block truncate">{a.specialist} · {a.duration} dk</span><span>{a.status}</span></Button>)}</div>;
        })}</div>)}
      </div>
    </div>
    <AppointmentDetails appointment={appointments.find((a) => a.id === selected) ?? null} onClose={() => setSelected(null)} />
  </>;
}

function ServiceManager() {
  const { services, updateService } = useSalon();
  return (
    <>
      <Title s="Hizmet & Fiyat" t="Hizmet Yönetimi" />

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-soft md:flex-row md:items-center">
            <img src={s.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <input aria-label={`${s.name} hizmet adı`} value={s.name} onChange={(e) => updateService(s.id, { name: e.target.value })} className="flex-1 rounded-xl border bg-background px-3 py-2 font-serif text-lg outline-none focus:border-accent" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">Süre
              <input type="number" min="1" value={s.duration} onChange={(e) => updateService(s.id, { duration: +e.target.value })} className="w-20 rounded-xl border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent" /> dk</label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">Fiyat ₺
              <input type="number" min="0" value={s.price} onChange={(e) => updateService(s.id, { price: +e.target.value })} className="w-28 rounded-xl border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent" /></label>
          </div>
        ))}
      </div>
    </>
  );
}

function CRM() {
  const [search, setSearch] = useState("");
  const { appointments, services } = useSalon();
  const customers = useMemo(() => {
    const m = new Map<string, typeof appointments>();
    appointments.forEach((a) => { const phone = a.phone.replace(/\D/g, "").replace(/^90/, "0"); m.set(phone, [...(m.get(phone) ?? []), a]); });
    return [...m.values()];
  }, [appointments]);
  return (
    <>
      <Title s="Müşteri CRM" t="Müşteriler" />
      <div className="mb-6 flex items-center gap-2"><Search className="h-4 w-4" /><input aria-label="Müşteri ara" placeholder="İsim, telefon veya e-posta" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md rounded-lg border bg-card px-4 py-3 text-sm" /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((list) => {
          const c = list[0];
          if (!c || !`${c.customer} ${c.phone} ${c.email}`.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))) return null;
          const spent = list.filter((a) => a.status !== "İptal").reduce((s, a) => s + a.total, 0);
          return (
            <div key={c.phone} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/30 font-serif text-lg">{c.customer[0]}</div>
                <div className="min-w-0 break-words"><p className="font-medium">{c.customer}</p><p className="text-xs text-muted-foreground">{c.phone} · {c.email}</p></div>
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
