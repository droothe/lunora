import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Clock, Phone, ArrowRight, Star, ShieldCheck, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { useSalon, CATEGORIES, GALLERY, IMAGES, tl } from "@/lib/salon-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HAIRPORT Coiffure by Pınar Öztunç — Atakum, Samsun" },
      { name: "description", content: "Samsun Atakum'da balyaj, doğal sarı tonlar, kesim, kaynak ve özel tesettür bölümü ile ayrıcalıklı güzellik deneyimi." },
      { property: "og:title", content: "HAIRPORT Coiffure by Pınar Öztunç" },
      { property: "og:description", content: "Master of Balyage · Atakent, Atakum / Samsun" },
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
      <span className="block font-serif text-2xl tracking-[0.25em]">HAIRPORT</span>
      <span className="block text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Coiffure by Pınar Öztunç</span>
    </a>
  );
}

function Header() {
  const { openBooking } = useSalon();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass border-b py-3" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="hidden gap-8 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={`#${h}`} className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => openBooking()} className="hidden rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-accent-foreground transition hover:shadow-soft sm:block">Hemen Randevu Al</button>
          <button aria-label="Menü" onClick={() => setOpen(true)} className="rounded-full border p-2.5 lg:hidden"><Menu className="h-4 w-4" /></button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div className="fade-up ml-auto flex h-full w-4/5 max-w-sm flex-col bg-background p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><Logo /><button aria-label="Kapat" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button></div>
            <nav className="mt-12 flex flex-col gap-6">
              {NAV.map(([l, h]) => <a key={h} href={`#${h}`} onClick={() => setOpen(false)} className="font-serif text-3xl">{l}</a>)}
            </nav>
            <button onClick={() => { setOpen(false); openBooking(); }} className="mt-auto rounded-full bg-accent py-4 text-xs uppercase tracking-[0.2em] text-accent-foreground">Hemen Randevu Al</button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { openBooking } = useSalon();
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-12 lg:px-10">
        <div className="fade-up lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <MapPin className="h-3 w-3 text-accent" /> Atakent, Atakum - Samsun
          </span>
          <h1 className="mt-8 text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Güzelliğinizi <em className="text-accent">Sanata</em> Dönüştürüyoruz.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Samsun Atakum'un seçkin salonunda kişiye özel balyaj, doğal sarı tonlar, profesyonel kesim ve ayrıcalıklı güzellik deneyimi.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => openBooking()} className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground transition hover:shadow-lift">
              Hemen Randevu Al <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a href="#hizmetler" className="rounded-full border px-7 py-4 text-xs uppercase tracking-[0.18em] transition hover:bg-card">Hizmetlerimizi Keşfedin</a>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-5 gap-4">
            <img src={IMAGES.hero} alt="Balyaj saç dönüşümü" width={1024} height={1280} className="col-span-3 aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
            <div className="col-span-2 flex flex-col gap-4 pt-16">
              <img src={GALLERY[1]!.src} alt="Doğal sarı tonlar" className="aspect-[3/4] w-full rounded-[1.5rem] object-cover shadow-soft" />
              <img src={GALLERY[11]!.src} alt="Sarı dalgalı saç" className="aspect-[3/4] w-full rounded-[1.5rem] object-cover shadow-soft" />
            </div>
          </div>
          <div className="glass absolute bottom-6 left-4 rounded-2xl border px-5 py-4 shadow-soft">
            <p className="eyebrow">Signature</p>
            <p className="font-serif text-xl">Master of Balyage</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badges() {
  const items = ["👑 Master of Balyage & Ombre", "✂️ Cut & Extension Expert", "🧕 Özel Tesettür Bölümümüz Mevcuttur", "📍 Atakent, Atakum Konumu"];
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
          <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-5 py-2 text-xs transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-accent"}`}>{c}</button>
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
                <button onClick={() => openBooking({ serviceIds: [s.id] })} className="rounded-full bg-accent px-4 py-2 text-xs text-accent-foreground transition hover:bg-primary hover:text-primary-foreground">Randevu Seç</button>
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
    ["Master of Balyage", "Işığın saçta nasıl kırıldığını bilen el işçiliği; yumuşak, doğal ve çok boyutlu geçişler.", GALLERY[4]!.src],
    ["Blonde Specialist", "Natural & blonde: sıcak bal tonlarından buz sarısına, saç sağlığını koruyan dönüşümler.", GALLERY[13]!.src],
    ["Cut & Extension Expert", "Yüz hattına özel kesimler ve görünmez kaynak teknikleriyle hacim ve uzunluk.", GALLERY[9]!.src],
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
      <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-soft lg:grid-cols-2">
        <img src={IMAGES.salon} alt="Özel bölüm" loading="lazy" className="h-full min-h-72 w-full object-cover" />
        <div className="flex flex-col justify-center p-10 lg:p-16">
          <p className="eyebrow">🧕 Özel Tesettür Bölümü</p>
          <h2 className="mt-4 text-5xl leading-tight">Size Özel, Size Ait Bir Güzellik Deneyimi.</h2>
          <p className="mt-6 text-muted-foreground">Özel tesettür bölümümüzde, tamamen size ayrılmış, konforlu ve mahremiyet odaklı bir ortamda güzellik hizmetlerimizi deneyimleyin.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Ayrı ve kapalı VIP alan", "Yalnızca kadın uzman kadrosu", "Randevulu, sakin ve mahrem hizmet"].map((x) => (
              <li key={x} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" />{x}</li>
            ))}
          </ul>
          <button onClick={() => openBooking({ privateSection: true })} className="mt-10 self-start rounded-full bg-primary px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground">Özel Bölüm İçin Randevu</button>
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
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2 text-xs transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-accent"}`}>{c}</button>
        ))}
      </div>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {list.map((g, i) => (
          <button key={g.src + i} onClick={() => setIdx(i)} className="group mb-4 block w-full overflow-hidden rounded-2xl">
            <img src={g.src} alt={g.cat} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}`} />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur" onClick={() => setIdx(null)}>
          <button aria-label="Önceki" className="absolute left-4 rounded-full bg-card p-3" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + list.length) % list.length); }}><ChevronLeft className="h-5 w-5" /></button>
          <img src={list[idx]!.src} alt="" className="fade-up max-h-[85vh] rounded-2xl object-contain" />
          <button aria-label="Sonraki" className="absolute right-4 rounded-full bg-card p-3" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % list.length); }}><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="hakkimizda" className="scroll-mt-24 bg-secondary py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <img src={IMAGES.salon} alt="HAIRPORT salon" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        <div>
          <p className="eyebrow">Hakkımızda</p>
          <h2 className="mt-4 text-5xl leading-tight">Pınar Öztunç</h2>
          <p className="mt-1 font-serif text-xl italic text-muted-foreground">Kurucu · Master Colorist · Makyaj Sanatçısı</p>
          <p className="mt-6 text-muted-foreground">HAIRPORT Coiffure, saçı bir sanat eseri gibi ele alan bir anlayışla Atakent'te kuruldu. Pınar Öztunç ve ekibi; balyaj, doğal sarı tonlar, kesim ve kaynak alanlarında kişiye özel, uzun ömürlü sonuçlar tasarlar.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
            {[["348+", "Paylaşılan dönüşüm"], ["5K+", "Mutlu takipçi"], ["%100", "Hijyen protokolü"]].map(([n, l]) => (
              <div key={l}><p className="font-serif text-4xl">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Tüm aletler her müşteri sonrası sterilize edilir; tek kullanımlık havlu ve önlükler, profesyonel ürün serileri kullanılır.</p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    ["Elif Y.", "Hayalimdeki balyajı ilk seferde yakaladık. Pınar Hanım'ın renk anlayışı gerçekten bambaşka."],
    ["Zeynep K.", "Tesettür bölümü sayesinde kendimi çok rahat hissettim. Huzurlu ve özenli bir deneyim."],
    ["Merve D.", "Düğünümde saç ve makyajım kusursuzdu, gece boyunca hiç bozulmadı."],
    ["Selin A.", "Sarıya geçişte saçımın sağlığı hiç bozulmadı, parlaklığı inanılmaz."],
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reviews.length]);
  return (
    <section className="mx-auto max-w-4xl px-5 py-28 text-center">
      <p className="eyebrow">Müşteri Yorumları</p>
      <div className="mt-6 flex justify-center gap-1 text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
      <blockquote key={i} className="fade-up mt-8 font-serif text-3xl leading-snug sm:text-4xl">“{reviews[i]![1]}”</blockquote>
      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{reviews[i]![0]}</p>
      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((_, k) => <button key={k} aria-label={`Yorum ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`} />)}
      </div>
    </section>
  );
}

function Contact() {
  const { openBooking } = useSalon();
  return (
    <section id="iletisim" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-28 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-8 shadow-soft lg:col-span-2">
          <p className="eyebrow">İletişim</p>
          <h2 className="mt-4 text-5xl">Sizi Ağırlamak İçin Sabırsızlanıyoruz.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-accent" /><div><p className="font-medium">Adres</p><p className="text-sm text-muted-foreground">Atatürk Blv. 97B, Atakent,<br />Atakum / Samsun</p></div></div>
            <div className="flex gap-3"><Clock className="h-5 w-5 text-accent" /><div><p className="font-medium">Çalışma Saatleri</p><p className="text-sm text-muted-foreground">Pzt – Cmt · 09:30 – 19:30<br />Pazar · Kapalı</p></div></div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://wa.me/905000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"><Phone className="h-4 w-4" /> WhatsApp ile Yazın</a>
            <a href="https://instagram.com/pinaroztunc_" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm"><Instagram className="h-4 w-4" /> @pinaroztunc_</a>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-primary p-8 text-primary-foreground">
          <p className="font-serif text-4xl leading-tight">Yeni bir siz için ilk adım.</p>
          <button onClick={() => openBooking()} className="mt-8 rounded-full bg-accent py-4 text-xs uppercase tracking-[0.2em] text-accent-foreground">Hemen Randevu Al</button>
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
        <p>© {new Date().getFullYear()} HAIRPORT Coiffure · Atakent, Atakum / Samsun</p>
        <Link to="/admin" className="hover:text-foreground">Yönetim Paneli</Link>
      </div>
    </footer>
  );
}
