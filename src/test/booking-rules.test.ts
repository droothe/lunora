import { describe, expect, it } from "vitest";
import { availableSpecialists, dateKey, isSlotAvailable, NAMED_SPECIALISTS, validCustomer } from "@/lib/booking-rules";

const now = new Date(2026, 10, 3, 8, 0);
const specialist = NAMED_SPECIALISTS[0];
const appointment = { date: "2026-11-03", time: "10:30", duration: 180, specialist, status: "Onaylandı" };
const occupied = [appointment];
describe("Booking rules", () => {
  it("preserves the selected local calendar day", () => expect(dateKey(new Date(2026, 10, 3))).toBe("2026-11-03"));
  it("blocks duration overlaps for the selected specialist", () => expect(isSlotAvailable("2026-11-03", "12:30", 60, specialist, occupied, now)).toBe(false));
  it("keeps a different specialist available", () => expect(isSlotAvailable("2026-11-03", "12:30", 60, NAMED_SPECIALISTS[1], occupied, now)).toBe(true));
  it("releases cancelled appointments", () => expect(isSlotAvailable("2026-11-03", "12:30", 60, specialist, [{ ...appointment, status: "İptal" }], now)).toBe(true));
  it("allows an adjacent appointment at the previous appointment's end", () => expect(isSlotAvailable("2026-11-03", "13:30", 60, specialist, occupied, now)).toBe(true));
  it("rejects appointments extending past 19:30", () => expect(isSlotAvailable("2026-11-03", "18:30", 120, specialist, [], now)).toBe(false));
  it("does not offer Sunday slots", () => expect(availableSpecialists("2026-11-08", "10:30", 60, [], now)).toEqual([]));
  it("does not offer elapsed times", () => expect(availableSpecialists("2026-11-03", "09:30", 60, [], new Date(2026, 10, 3, 10))).toEqual([]));
  it("accepts name and Turkish phone while email is optional", () => expect(validCustomer("Ada Yılmaz", "0532 123 45 67", "")).toBe(true));
  it("rejects malformed customer information", () => expect(validCustomer("Ada Yılmaz", "1234567", "ada@")).toBe(false));
});