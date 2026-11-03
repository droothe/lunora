import { useState } from "react";
import { Check, ChevronLeft, Sparkles } from "lucide-react";
import { useSalon, SPECIALISTS, TIME_SLOTS, tl, type Appointment } from "@/lib/salon-store";

import { Button } from "@/components/ui/button";
import { SalonModal } from "./SalonModal";
import { dateKey, isSlotAvailable, validCustomer } from "@/lib/booking-rules";

const STEPS = ["Hizmet", "Uzman", "Tarih & Saat", "Bilgiler"];

function nextDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function BookingWizard() {
  const { booking, closeBooking } = useSalon();
  if (!booking.open) return null;
  return <Wizard key={booking.key} onClose={closeBooking} />;
}

function Wizard({ onClose }: { onClose: () => void }) {
  const { services, booking, addAppointment, appointments } = useSalon();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<string[]>(booking.preset.serviceIds ?? []);
  const [spec, setSpec] = useState("");
  const [date, setDate] = useState(dateKey(new Date()));
  const [time, setTime] = useState("");
  const [priv, setPriv] = useState(!!booking.preset.privateSection);
  const [info, setInfo] = useState({ name: "", phone: "", email: "", notes: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState<Appointment | null>(null);

  const chosen = services.filter((s) => sel.includes(s.id));
  const total = chosen.reduce((a, s) => a + s.price, 0);
  const duration = chosen.reduce((a, s) => a + s.duration, 0);
  const slotAvailable = (value: string) => isSlotAvailable(date, value, duration, spec, appointments);
  const canNext = [sel.length > 0, !!spec, !!time && slotAvailable(time), validCustomer(info.name, info.phone, info.email)][step];

  const submit = () => {
    const a = addAppointment({
      customer: info.name, phone: info.phone, email: info.email, notes: info.notes,
      serviceIds: sel, specialist: spec, date, time, privateSection: priv, total, duration,
    });
    if (!a) { setError("Bu saat artık uygun değil. Lütfen tarih ve saat seçiminizi kontrol edin."); setStep(2); setTime(""); return; }
    setDone(a);
  };

  return (
    <SalonModal open onClose={onClose} title="HAIRPORT Online Randevu">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <p className="eyebrow">Online Randevu</p>
            <h3 className="text-2xl">HAIRPORT Coiffure</h3>
          </div>

        </div>

        {done ? (
          <div className="flex flex-col items-center overflow-y-auto px-6 py-10 text-center">
            <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-accent/30"><Check className="h-7 w-7" /></div>
            <h3 className="text-4xl">Randevunuz Alındı</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">Randevu talebiniz bu oturumda oluşturuldu. HAIRPORT ile Instagram üzerinden iletişime geçebilirsiniz.</p>
            <div className="mt-8 w-full max-w-sm rounded-2xl border bg-background p-6 text-left text-sm">
              <p className="eyebrow">Referans Kodu</p>
              <p className="mb-4 font-serif text-3xl tracking-widest">{done.ref}</p>
              <Row k="Tarih" v={`${new Date(done.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} · ${done.time}`} />
              <Row k="Uzman" v={done.specialist} />
              <Row k="Toplam" v={tl(done.total)} />
               {chosen.map((s) => <Row key={s.id} k="Hizmet" v={s.name} />)}
              {done.privateSection && <Row k="Bölüm" v="Özel Tesettür Bölümü" />}
            </div>
            <Button variant="editorial" size="auto" onClick={onClose} className="mt-8 rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground">Tamam</Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 px-6 pt-5">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className={`h-0.5 rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-border"}`} />
                  <p className={`mt-2 text-[10px] uppercase tracking-[0.2em] ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{i + 1}. {s}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const on = sel.includes(s.id);
                    return (
                      <Button variant="editorial" size="auto" key={s.id} aria-pressed={on} onClick={() => setSel(on ? sel.filter((x) => x !== s.id) : [...sel, s.id])}
                        className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${on ? "border-accent bg-accent/10" : "hover:border-accent/60"}`}>
                        <img src={s.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-serif text-lg leading-tight">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.duration} dk · {tl(s.price)}'den</p>
                        </div>
                        <span className={`grid h-5 w-5 place-items-center rounded-full border ${on ? "border-primary bg-primary text-primary-foreground" : ""}`}>{on && <Check className="h-3 w-3" />}</span>
                      </Button>
                    );
                  })}
                </div>
              )}
              {step === 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {SPECIALISTS.map((s) => (
                    <Button variant="editorial" size="auto" key={s} aria-pressed={spec === s} onClick={() => setSpec(s)} className={`rounded-2xl border p-5 text-left transition ${spec === s ? "border-accent bg-accent/10" : "hover:border-accent/60"}`}>
                      <Sparkles className="mb-3 h-4 w-4 text-accent" />
                      <p className="font-serif text-xl">{s}</p>
                    </Button>
                  ))}
                </div>
              )}
              {step === 2 && (
                <div>
                  <p className="eyebrow mb-3">Tarih</p>
                  <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
                    {nextDays(14).map((d) => {
                      const v = dateKey(d);
                      const closed = d.getDay() === 0;
                      return (
                        <Button variant="editorial" size="auto" key={v} aria-pressed={date === v} disabled={closed} onClick={() => { setDate(v); setTime(""); }}
                          className={`min-w-16 rounded-2xl border px-3 py-3 text-center transition disabled:opacity-30 ${date === v ? "border-primary bg-primary text-primary-foreground" : "hover:border-accent"}`}>
                          <p className="text-[10px] uppercase tracking-widest">{d.toLocaleDateString("tr-TR", { weekday: "short" })}</p>
                          <p className="font-serif text-2xl">{d.getDate()}</p>
                        </Button>
                      );
                    })}
                  </div>
                  <p className="eyebrow mb-3 mt-6">Saat</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {TIME_SLOTS.map((t) => {
                      const busy = !slotAvailable(t);
                      return (
                        <Button variant="editorial" size="auto" key={t} aria-pressed={time === t} disabled={busy} onClick={() => setTime(t)}
                          className={`rounded-xl border py-2.5 text-sm transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${time === t ? "border-accent bg-accent text-accent-foreground" : "hover:border-accent"}`}>{t}</Button>
                      );
                    })}
                  </div>
                  <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border bg-secondary/50 p-4">
                    <input type="checkbox" checked={priv} onChange={(e) => setPriv(e.target.checked)} className="h-4 w-4 accent-primary" />
                    <span className="text-sm">🧕 Özel Tesettür Bölümü Tercih Ediyorum</span>
                  </label>
                </div>
              )}
              {step === 3 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    {([["name", "Ad Soyad"], ["phone", "Telefon"], ["email", "E-posta"]] as const).map(([k, l]) => (
                      <label key={k} className="block text-xs text-muted-foreground">{l}<input aria-label={l} type={k === "email" ? "email" : k === "phone" ? "tel" : "text"} autoComplete={k === "name" ? "name" : k === "phone" ? "tel" : "email"} placeholder={k === "phone" ? "05xx xxx xx xx" : l} value={info[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })}
                        className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent" />
                    ))}
                    <textarea aria-label="Notlar" placeholder="Notlar" rows={3} value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                      className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
                  </div>
                  <div className="rounded-2xl border bg-background p-5 text-sm">
                    <p className="eyebrow mb-3">Özet</p>
                    {chosen.map((s) => <Row key={s.id} k={s.name} v={tl(s.price)} />)}
                    <div className="my-3 border-t" />
                    <Row k="Uzman" v={spec} />
                    <Row k="Tarih" v={`${new Date(date).toLocaleDateString("tr-TR")} · ${time}`} />
                    {priv && <Row k="Bölüm" v="Özel Tesettür" />}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t bg-background/60 px-6 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{duration} dk · {sel.length} hizmet</p>
                <p className="font-serif text-2xl">{tl(total)}</p>
              </div>
              <div className="flex gap-2">
                {step > 0 && <Button variant="editorial" size="auto" aria-label="Önceki adım" onClick={() => setStep(step - 1)} className="rounded-full border p-3"><ChevronLeft className="h-4 w-4" /></Button>}
                <Button variant="editorial" size="auto" disabled={!canNext} onClick={() => (step < 3 ? setStep(step + 1) : submit())}
                  className="rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground transition disabled:opacity-40">
                  {step < 3 ? "Devam Et" : "Randevuyu Onayla"}
                </Button>
              </div>
            </div>
          </>
        )}
    </SalonModal>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}
