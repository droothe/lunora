export const OPENING_MINUTES = 9 * 60 + 30;
export const CLOSING_MINUTES = 19 * 60 + 30;
export const ANY_SPECIALIST = "Fark Etmez";
export const NAMED_SPECIALISTS = ["Pınar Öztunç - Master Colorist", "Senior Hair Stylist", "Makeup Artist"] as const;

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function timeMinutes(time: string) {
  const [hour = 0, minute = 0] = time.split(":").map(Number);
  return hour * 60 + minute;
}
type Occupied = { date: string; time: string; duration: number; specialist: string; status: string };
export function availableSpecialists(date: string, time: string, duration: number, appointments: Occupied[], now = new Date()) {
  const start = timeMinutes(time);
  const day = new Date(`${date}T12:00:00`);
  if (!date || !time || !Number.isFinite(duration) || duration <= 0 || day.getDay() === 0 || date < dateKey(now) || start < OPENING_MINUTES || start + duration > CLOSING_MINUTES) return [];
  if (date === dateKey(now) && start <= now.getHours() * 60 + now.getMinutes()) return [];
  return NAMED_SPECIALISTS.filter((specialist) => !appointments.some((a) =>
    a.date === date && a.status !== "İptal" && (a.specialist === specialist || a.specialist === ANY_SPECIALIST) &&
    start < timeMinutes(a.time) + a.duration && start + duration > timeMinutes(a.time)
  ));
}
export function isSlotAvailable(date: string, time: string, duration: number, specialist: string, appointments: Occupied[], now = new Date()) {
  const free = availableSpecialists(date, time, duration, appointments, now);
  return specialist === ANY_SPECIALIST ? free.length > 0 : free.some((s) => s === specialist);
}
export function validCustomer(name: string, phone: string, email: string) {
  const digits = phone.replace(/\D/g, "");
  return name.trim().length > 1 && /^(?:0?5\d{9}|905\d{9})$/.test(digits) && (!email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));
}