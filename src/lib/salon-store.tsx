import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import blonde from "@/assets/blonde.jpg";
import bride from "@/assets/bride.jpg";
import salon from "@/assets/salon.jpg";
import { ANY_SPECIALIST, availableSpecialists, dateKey, isSlotAvailable, validCustomer } from "./booking-rules";

export const CATEGORIES = [
  "Tüm Hizmetler",
  "Renklendirme & Balyage",
  "Kesim & Şekillendirme",
  "Saç Bakımı",
  "Kaynak & Uzatma",
  "Özel Gün & Gelin",
] as const;

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  image: string;
};

export type Status = "Bekliyor" | "Onaylandı" | "Tamamlandı" | "İptal";

export type Appointment = {
  id: string;
  ref: string;
  customer: string;
  phone: string;
  email: string;
  notes: string;
  serviceIds: string[];
  specialist: string;
  date: string; // yyyy-mm-dd
  time: string;
  privateSection: boolean;
  status: Status;
  total: number;
  duration: number;
};

export const SPECIALISTS = [
  "Pınar Öztunç - Master Colorist",
  "Senior Hair Stylist",
  "Makeup Artist",
  "Fark Etmez",
];

export const TIME_SLOTS = ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30"];

const initialServices: Service[] = [
  { id: "s1", name: "Master Balyage & Ombre", category: "Renklendirme & Balyage", description: "El işçiliğiyle uygulanan, yüzünüzü aydınlatan doğal geçişli balyaj.", duration: 180, price: 4500, image: hero },
  { id: "s2", name: "Premium Blonde Transformation", category: "Renklendirme & Balyage", description: "Saç sağlığını koruyarak kusursuz soğuk ve doğal sarı tonlar.", duration: 240, price: 6500, image: blonde },
  { id: "s3", name: "Dip Boyama", category: "Renklendirme & Balyage", description: "Uzayan diplerin tona birebir uyumlu, parlak yenilenmesi.", duration: 90, price: 1800, image: blonde },
  { id: "s4", name: "Profesyonel Saç Kesimi", category: "Kesim & Şekillendirme", description: "Yüz hattınıza göre tasarlanan kişiye özel kesim ve fön.", duration: 60, price: 1200, image: salon },
  { id: "s5", name: "Mikro Kaynak", category: "Kaynak & Uzatma", description: "Görünmez bağlantılarla doğal hacim ve uzunluk.", duration: 210, price: 9000, image: hero },
  { id: "s6", name: "Keratin Bakım", category: "Saç Bakımı", description: "Elektriklenmeyi gideren, ipeksi parlaklık kazandıran bakım.", duration: 150, price: 3500, image: blonde },
  { id: "s7", name: "VIP Gelin Paketi", category: "Özel Gün & Gelin", description: "Prova, gelin saçı ve makyajı ile özel gününüze tam hazırlık.", duration: 300, price: 15000, image: bride },
  { id: "s8", name: "Profesyonel Makyaj", category: "Özel Gün & Gelin", description: "Işıltılı, kalıcı ve fotoğraf dostu özel gün makyajı.", duration: 75, price: 2500, image: bride },
];

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return dateKey(d);
};

const initialAppointments: Appointment[] = [
  { id: "a1", ref: "HP-48213", customer: "Elif Yılmaz", phone: "0532 111 22 33", email: "elif@mail.com", notes: "Soğuk tonları seviyor.", serviceIds: ["s1"], specialist: "Pınar Öztunç - Master Colorist", date: iso(0), time: "10:30", privateSection: false, status: "Onaylandı", total: 4500, duration: 180 },
  { id: "a2", ref: "HP-48214", customer: "Zeynep Kaya", phone: "0533 222 33 44", email: "zeynep@mail.com", notes: "", serviceIds: ["s6"], specialist: "Senior Hair Stylist", date: iso(0), time: "14:30", privateSection: true, status: "Bekliyor", total: 3500, duration: 150 },
  { id: "a3", ref: "HP-48215", customer: "Merve Demir", phone: "0535 333 44 55", email: "merve@mail.com", notes: "Haziran düğünü.", serviceIds: ["s7"], specialist: "Pınar Öztunç - Master Colorist", date: iso(1), time: "09:30", privateSection: false, status: "Bekliyor", total: 15000, duration: 300 },
  { id: "a4", ref: "HP-48216", customer: "Ayşe Çelik", phone: "0536 444 55 66", email: "ayse@mail.com", notes: "", serviceIds: ["s4", "s3"], specialist: "Senior Hair Stylist", date: iso(2), time: "16:30", privateSection: true, status: "Onaylandı", total: 3000, duration: 150 },
  { id: "a5", ref: "HP-48217", customer: "Elif Yılmaz", phone: "0532 111 22 33", email: "elif@mail.com", notes: "", serviceIds: ["s6"], specialist: "Pınar Öztunç - Master Colorist", date: iso(-6), time: "11:30", privateSection: false, status: "Tamamlandı", total: 3500, duration: 150 },
  { id: "a6", ref: "HP-48218", customer: "Selin Arslan", phone: "0537 555 66 77", email: "selin@mail.com", notes: "", serviceIds: ["s2"], specialist: "Pınar Öztunç - Master Colorist", date: iso(-3), time: "12:30", privateSection: false, status: "Tamamlandı", total: 6500, duration: 240 },
];

type BookingPreset = { serviceIds?: string[]; privateSection?: boolean };

type Ctx = {
  services: Service[];
  updateService: (id: string, patch: Partial<Service>) => void;
  appointments: Appointment[];
  addAppointment: (a: Omit<Appointment, "id" | "ref" | "status">) => Appointment | null;
  setStatus: (id: string, s: Status) => void;
  booking: { open: boolean; preset: BookingPreset; key: number };
  openBooking: (preset?: BookingPreset) => void;
  closeBooking: () => void;
};

const SalonContext = createContext<Ctx | null>(null);

export function SalonProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState(initialServices);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [booking, setBooking] = useState({ open: false, preset: {} as BookingPreset, key: 0 });

  const updateService = useCallback((id: string, patch: Partial<Service>) => {
    if (patch.price !== undefined && (!Number.isFinite(patch.price) || patch.price < 0)) return;
    if (patch.duration !== undefined && (!Number.isFinite(patch.duration) || patch.duration <= 0)) return;
    setServices((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);

  const addAppointment: Ctx["addAppointment"] = (a) => {
    const chosen = services.filter((s) => a.serviceIds.includes(s.id));
    const duration = chosen.reduce((sum, s) => sum + s.duration, 0);
    const total = chosen.reduce((sum, s) => sum + s.price, 0);
    if (!chosen.length || !validCustomer(a.customer, a.phone, a.email) || !isSlotAvailable(a.date, a.time, duration, a.specialist, appointments)) return null;
    const specialist = a.specialist === ANY_SPECIALIST ? availableSpecialists(a.date, a.time, duration, appointments)[0] : a.specialist;
    if (!specialist) return null;
    let ref = "";
    do { ref = "HP-" + Math.floor(10000 + Math.random() * 90000); } while (appointments.some((x) => x.ref === ref));
    const appt: Appointment = {
      ...a,
      customer: a.customer.trim(), phone: a.phone.trim(), email: a.email.trim(), specialist, duration, total,
      id: crypto.randomUUID(),
      ref,
      status: "Bekliyor",
    };
    setAppointments((list) => [appt, ...list]);
    return appt;
  };

  const setStatus = (id: string, status: Status) =>
    setAppointments((l) => l.map((a) => (a.id === id ? { ...a, status } : a)));

  return (
    <SalonContext.Provider
      value={{
        services,
        updateService,
        appointments,
        addAppointment,
        setStatus,
        booking,
        openBooking: (preset = {}) => setBooking((b) => ({ open: true, preset, key: b.key + 1 })),
        closeBooking: () => setBooking((b) => ({ ...b, open: false })),
      }}
    >
      {children}
    </SalonContext.Provider>
  );
}

export function useSalon() {
  const c = useContext(SalonContext);
  if (!c) throw new Error("useSalon outside provider");
  return c;
}

export const tl = (n: number) => "₺" + n.toLocaleString("tr-TR");
const WORK = Object.values(import.meta.glob("@/assets/work/*.jpg", { eager: true, import: "default" })) as string[];
const CATS = ["Balyaj", "Sarı Tonlar", "Kaynak", "Kesim", "Balyaj", "Sarı Tonlar"];
export const GALLERY = [
  ...WORK.slice(0, 22).map((src, i) => ({ src, cat: CATS[i % CATS.length] })),
  { src: bride, cat: "Gelin" },
  { src: hero, cat: "Gelin" },
];
export const IMAGES = { hero, blonde, bride, salon };
