import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Clock, Phone, Mail, ArrowRight, Star, ShieldCheck, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalonModal } from "@/components/site/SalonModal";
import { useSalon, CATEGORIES, GALLERY, IMAGES, tl } from "@/lib/salon-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lunora Atelier — Örnek Saç Tasarım Stüdyosu" },
      { name: "description", content: "Lunora Atelier, saç tasarımı ve güzellik hizmetleri için hazırlanmış örnek bir salon sitesidir." },
      { property: "og:title", content: "Lunora Atelier" },
      { property: "og:description", content: "Örnek saç tasarımı ve güzellik stüdyosu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Ana Sayfa", "top"], ["Hizmetler", "hizmetler"], ["Uzmanlıklarımız", "uzmanlik"],
  ["Galeri", "galeri"], ["Hakkımızda", "hakkimizda"], ["İletişim", "iletisim"],
];

function Index() {
  return (
    <div id="top">
      <Header />
      <Hero />
      <Badges />
      <Services />
      <Expertise />
      <Private />
      <Gallery />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="leading-none">
      <span className="block font-serif text-2xl tracking-[0.25em]">LUNORA</span>
      <span className="block text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Hair Atelier</span>
    </a>
  );
}

function Header() {
  const { openBooking } = useSalon();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass border-b py-3" : "border-b bg-background/95 py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="hidden gap-8 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={`#${h}`} className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="editorial" size="auto" onClick={() => openBooking()} className="hidden rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-accent-foreground transition hover:shadow-soft sm:block">Hemen Randevu Al</Button>
          <Button variant="editorial" size="auto" aria-label="Menü" onClick={() => setOpen(true)} className="rounded-full border p-2.5 lg:hidden"><Menu className="h-4 w-4" /></Button>
        </div>
      </div>
      <SalonModal open={open} onClose={() => setOpen(false)} title="Menü" className="left-auto right-0 top-0 h-dvh max-h-dvh w-4/5 max-w-sm translate-x-0 translate-y-0 rounded-none bg-background p-8 lg:hidden">
        <Logo />
        <nav className="mt-12 flex flex-col gap-6">
          {NAV.map(([l, h]) => <a key={h} href={`#${h}`} onClick={() => setOpen(false)} className="font-serif text-3xl">{l}</a>)}
        </nav>
        <Button variant="editorial" size="auto" onClick={() => { setOpen(false); openBooking(); }} className="mt-auto rounded-full bg-accent py-4 text-xs uppercase text-accent-foreground">Hemen Randevu Al</Button>
      </SalonModal>
    </header>
  );
}

function Hero() {
  const { openBooking } = useSalon();
  return (
    <section className="salon-hero relative isolate overflow-hidden">
      <img src={IMAGES.hero} alt="Lunora Atelier saç renklendirme çalışması" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" fetchPriority="high" />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto flex h-full max-w-7xl items-end px-5 pb-10 pt-28 lg:px-10 lg:pb-14">
        <div className="fade-up max-w-2xl text-hero-foreground">
          <p className="mb-5 flex items-center gap-2 text-xs uppercase"><MapPin className="h-3 w-3" /> Örnekşehir</p>
          <h1 className="text-5xl leading-none sm:text-7xl lg:text-8xl">LUNORA <span className="mt-2 block text-3xl italic sm:text-4xl">Hair Atelier</span></h1>
          <p className="mt-5 font-serif text-2xl sm:text-3xl">Güzelliğinizi <em>Sanata</em> Dönüştürüyoruz.</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-hero-foreground/90">Saç tasarımı, doğal renk geçişleri ve kişiye özel güzellik deneyimi için hazırlanmış örnek salon.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="editorial" size="auto" onClick={() => openBooking()} className="group rounded-full bg-accent px-6 py-3 text-xs uppercase text-accent-foreground">Hemen Randevu Al <ArrowRight className="transition group-hover:translate-x-1" /></Button>
            <Button asChild variant="editorial" size="auto" className="rounded-full border border-hero-foreground/50 px-6 py-3 text-xs text-hero-foreground"><a href="#hizmetler">Hizmetlerimizi Keşfedin</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badges() {
  const items = ["👑 Renk Tasarımı Uzmanı", "✂️ Kesim & Şekillendirme", "🧕 Özel Bölüm Seçeneği", "📍 Örnekşehir Konumu"];
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-10">
      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => <div key={i} className="bg-secondary px-6 py-5 text-center text-sm">{i}</div>)}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-5xl leading-tight sm:text-6xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Services() {
  const { services, openBooking } = useSalon();
  const [cat, setCat] = useState<string>(CATEGORIES[0]);
  const list = cat === CATEGORIES[0] ? services : services.filter((s) => s.category === cat);
  return (
    <section id="hizmetler" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 lg:px-10">
      <SectionHead eyebrow="Hizmet Menüsü" title="Ritüeller & Hizmetler" />
      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:justify-center">
        {CATEGORIES.map((c) => (
          <Button variant="editorial" size="auto" key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-5 py-2 text-xs transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-accent"}`}>{c}</Button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <article key={s.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-500 hover:-translate-y-1 hover:shadow-lift">
            <div className="overflow-hidden"><img src={s.image} alt={s.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /></div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.category}</p>
              <h3 className="mt-2 text-2xl leading-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-5 flex items-end justify-between border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground"><Clock className="mr-1 inline h-3 w-3" />{s.duration} dk</p>
                  <p className="font-serif text-xl">{tl(s.price)}<span className="text-xs text-muted-foreground"> 'den</span></p>
                </div>
                <Button variant="editorial" size="auto" onClick={() => openBooking({ serviceIds: [s.id] })} className="rounded-full bg-accent px-4 py-2 text-xs text-accent-foreground transition hover:bg-primary hover:text-primary-foreground">Randevu Seç</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Expertise() {
  const items = [
    ["Master of Balyage", "Işığın saçta nasıl kırıldığını bilen el işçiliği; yumuşak, doğal ve çok boyutlu geçişler.", GALLERY[4]?.src ?? IMAGES.hero],
    ["Blonde Specialist", "Natural & blonde: sıcak bal tonlarından buz sarısına, saç sağlığını koruyan dönüşümler.", GALLERY[13]?.src ?? IMAGES.blonde],
    ["Cut & Extension Expert", "Yüz hattına özel kesimler ve görünmez kaynak teknikleriyle hacim ve uzunluk.", GALLERY[9]?.src ?? IMAGES.hero],
  ] as const;
  return (
    <section id="uzmanlik" className="scroll-mt-24 bg-secondary py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHead eyebrow="Uzmanlıklarımız" title="İmza Teknikler" />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map(([t, d, img], i) => (
            <div key={t} className={i === 1 ? "md:mt-16" : ""}>
              <img src={img} alt={t} loading="lazy" className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-soft" />
              <p className="eyebrow mt-6">0{i + 1}</p>
              <h3 className="mt-2 text-3xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Private() {
  const { openBooking } = useSalon();
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <img src={IMAGES.salon} alt="Özel bölüm" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        <div className="flex flex-col justify-center py-6 lg:px-8">
          <p className="eyebrow">🧕 Özel Tesettür Bölümü</p>
          <h2 className="mt-4 text-5xl leading-tight">Size Özel, Size Ait Bir Güzellik Deneyimi.</h2>
          <p className="mt-6 text-muted-foreground">Özel tesettür bölümümüzde, tamamen size ayrılmış, konforlu ve mahremiyet odaklı bir ortamda güzellik hizmetlerimizi deneyimleyin.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Ayrı ve kapalı VIP alan", "Yalnızca kadın uzman kadrosu", "Randevulu, sakin ve mahrem hizmet"].map((x) => (
              <li key={x} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" />{x}</li>
            ))}
          </ul>
          <Button variant="editorial" size="auto" onClick={() => openBooking({ privateSection: true })} className="mt-10 self-start rounded-full bg-primary px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground">Özel Bölüm İçin Randevu</Button>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const cats = ["Tümü", "Balyaj", "Sarı Tonlar", "Kesim", "Kaynak", "Gelin"];
  const [cat, setCat] = useState("Tümü");
  const [idx, setIdx] = useState<number | null>(null);
  const list = cat === "Tümü" ? GALLERY : GALLERY.filter((g) => g.cat === cat);
  return (
    <section id="galeri" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 lg:px-10">
      <SectionHead eyebrow="Portfolyo" title="Dönüşüm Galerisi" />
      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:justify-center">
        {cats.map((c) => (
          <Button variant="editorial" size="auto" key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2 text-xs transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-accent"}`}>{c}</Button>
        ))}
      </div>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {list.map((g, i) => (
          <Button variant="editorial" size="auto" key={g.src + i} aria-label={`${g.cat} çalışması ${i + 1}`} onClick={() => setIdx(i)} className="group mb-4 block w-full overflow-hidden rounded-2xl">
            <img src={g.src} alt={g.cat} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}`} />
          </Button>
        ))}
      </div>
      <SalonModal open={idx !== null} onClose={() => setIdx(null)} title="Dönüşüm Galerisi" className="max-w-5xl bg-background p-4 pt-14">
        {idx !== null && list[idx] && <>
          <img src={list[idx]?.src} alt={list[idx]?.cat} className="max-h-[72dvh] min-h-0 w-full object-contain" />
          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" size="icon" aria-label="Önceki" onClick={() => setIdx((idx - 1 + list.length) % list.length)}><ChevronLeft /></Button>
            <p className="text-sm">{list[idx]?.cat} · {idx + 1} / {list.length}</p>
            <Button variant="outline" size="icon" aria-label="Sonraki" onClick={() => setIdx((idx + 1) % list.length)}><ChevronRight /></Button>
          </div>
        </>}
      </SalonModal>
    </section>
  );
}

function About() {
  return (
    <section id="hakkimizda" className="scroll-mt-24 bg-secondary py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <img src={IMAGES.salon} alt="Lunora Atelier salonu" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        <div>
          <p className="eyebrow">Hakkımızda</p>
          <h2 className="mt-4 text-5xl leading-tight">Lunora Atelier</h2>
          <p className="mt-1 font-serif text-xl italic text-muted-foreground">Örnek Saç Tasarım Stüdyosu</p>
          <p className="mt-6 text-muted-foreground">Lunora Atelier, saçı bir sanat eseri gibi ele alan örnek bir salon markasıdır. Ekibimiz; renk tasarımı, kesim ve bakım alanlarında kişiye özel sonuçlar sunmayı hedefler.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
            {[["8+", "Örnek hizmet"], ["Demo", "Örnek içerik"], ["%100", "Kurgusal marka"]].map(([n, l]) => (
              <div key={l}><p className="font-serif text-4xl">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Bu sayfadaki salon, hizmet ve iletişim bilgileri örnek amaçlıdır.</p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    ["Örnek Müşteri", "Kişiye özel saç tasarımı ve özenli bir deneyim."],
    ["Örnek Müşteri", "Özel bölüm seçeneği sayesinde rahat bir ziyaret."],
    ["Örnek Müşteri", "Özel gün saç ve makyajı için örnek değerlendirme."],
    ["Örnek Müşteri", "Doğal renk geçişleri ve parlak bir görünüm."],
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reviews.length]);
  return (
    <section className="mx-auto max-w-4xl px-5 py-28 text-center">
      <p className="eyebrow">Örnek Müşteri Yorumları</p>
      <div className="mt-6 flex justify-center gap-1 text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
      <blockquote key={i} className="fade-up mt-8 font-serif text-3xl leading-snug sm:text-4xl">“{reviews[i]?.[1]}”</blockquote>
      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{reviews[i]?.[0]}</p>
      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((_, k) => <Button variant="editorial" size="auto" key={k} aria-label={`Yorum ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`} />)}
      </div>
    </section>
  );
}

function Contact() {
  const { openBooking } = useSalon();
  return (
    <section id="iletisim" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-28 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="py-8 lg:col-span-2">
          <p className="eyebrow">İletişim</p>
          <h2 className="mt-4 text-5xl">Sizi Ağırlamak İçin Sabırsızlanıyoruz.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-accent" /><div><p className="font-medium">Örnek Adres</p><p className="text-sm text-muted-foreground">Örnek Mahallesi, Örnek Sokak No: 00,<br />Örnekşehir</p></div></div>
            <div className="flex gap-3"><Clock className="h-5 w-5 text-accent" /><div><p className="font-medium">Örnek Çalışma Saatleri</p><p className="text-sm text-muted-foreground">Pzt – Cmt · 10:00 – 18:00<br />Pazar · Kapalı</p></div></div>
            <div className="flex gap-3"><Phone className="h-5 w-5 text-accent" /><div><p className="font-medium">Örnek Telefon</p><p className="text-sm text-muted-foreground">+90 (5xx) xxx xx xx</p></div></div>
            <div className="flex gap-3"><Mail className="h-5 w-5 text-accent" /><div><p className="font-medium">Örnek E-posta</p><p className="text-sm text-muted-foreground">merhaba@example.com</p></div></div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="mailto:merhaba@example.com" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"><Mail className="h-4 w-4" /> Örnek E-posta</a>
            <a href="https://example.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm"><Instagram className="h-4 w-4" /> Örnek Sosyal Medya</a>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-primary p-8 text-primary-foreground">
          <p className="font-serif text-4xl leading-tight">Yeni bir siz için ilk adım.</p>
          <Button variant="editorial" size="auto" onClick={() => openBooking()} className="mt-8 rounded-full bg-accent py-4 text-xs uppercase tracking-[0.2em] text-accent-foreground">Hemen Randevu Al</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-xs text-muted-foreground sm:flex-row lg:px-10">
        <Logo />
        <p>© {new Date().getFullYear()} Lunora Atelier · Örnekşehir · Örnek site</p>
        <Link to="/admin" className="hover:text-foreground">Yönetim Paneli</Link>
      </div>
    </footer>
  );
}
