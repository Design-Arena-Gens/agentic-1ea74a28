"use client";

import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import type { BookingDetails, MeetingMode, TimeSlot } from "@/types/booking";

const timeSlots: TimeSlot[] = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "05:00 PM", value: "17:00" },
];

const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const availabilityLabel = (date: Date) => {
  const day = date.getDate();
  const value = (day % 4) + (day % 3);
  if (value >= 5) return "High availability";
  if (value >= 3) return "Limited slots";
  return "Almost full";
};

const defaultBooking: BookingDetails = {
  clientName: "",
  email: "",
  date: format(new Date(), "yyyy-MM-dd"),
  timeSlot: timeSlots[1].value,
  mode: "in-person",
  location: "Horizon Estates HQ, 5th Ave",
  notes: "",
  virtualMeetingLink: "",
};

export function BookingDashboard() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [booking, setBooking] = useState<BookingDetails>(defaultBooking);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const today = startOfToday();

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

    const days: Date[] = [];
    let current = start;
    while (current <= end) {
      days.push(current);
      current = addDaysSafe(current, 1);
    }
    return days;
  }, [currentMonth]);

  const summaryDetails = useMemo(
    () => ({
      formattedDate: format(selectedDate, "EEEE, MMMM do"),
      formattedTime:
        timeSlots.find((slot) => slot.value === booking.timeSlot)?.label ??
        booking.timeSlot,
      isVirtual: booking.mode === "online",
    }),
    [booking.mode, booking.timeSlot, selectedDate],
  );

  function handleDateSelect(date: Date) {
    if (isBefore(date, today)) return;
    setSelectedDate(date);
    setBooking((prev) => ({
      ...prev,
      date: format(date, "yyyy-MM-dd"),
    }));
  }

  function handleTimeSlot(value: string) {
    setBooking((prev) => ({
      ...prev,
      timeSlot: value,
    }));
  }

  function handleModeChange(mode: MeetingMode) {
    setBooking((prev) => ({
      ...prev,
      mode,
      location:
        mode === "online"
          ? "Zoom — secure link will be provided after confirmation"
          : "Horizon Estates HQ, 5th Ave",
      virtualMeetingLink: mode === "online" ? "Pending confirmation" : "",
    }));
  }

  function handleInputChange(
    key: keyof Pick<
      BookingDetails,
      "clientName" | "email" | "notes" | "location"
    >,
    value: string,
  ) {
    setBooking((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmationMessage(
      `Session reserved for ${summaryDetails.formattedDate} at ${summaryDetails.formattedTime}. You'll receive a confirmation within 15 minutes.`,
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 py-14">
      <div className="absolute inset-0 mx-auto max-w-5xl translate-y-[-40%] rounded-full bg-gradient-to-b from-sky-200/40 via-transparent to-transparent blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 text-slate-900">
          <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Booking Console
          </span>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Schedule a private consultation
              </h1>
              <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                Reserve dedicated time with our advisory team for property
                tours, market briefings, and bespoke investment strategies.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Prime availability
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                Limited
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <form
            onSubmit={submitBooking}
            className="glass-surface flex flex-col gap-8 rounded-[28px] bg-white/90 p-8"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">
                Consultation details
              </h2>
              <p className="text-sm text-slate-500">
                Choose your preferred date, time, and meeting experience. Times
                are displayed in your local timezone.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Full name
                </span>
                <input
                  type="text"
                  value={booking.clientName}
                  onChange={(event) =>
                    handleInputChange("clientName", event.target.value)
                  }
                  placeholder="Jordan Wells"
                  className="w-full border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-300"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Email address
                </span>
                <input
                  type="email"
                  value={booking.email}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  placeholder="jordan@company.com"
                  className="w-full border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-300"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Selected date
                </span>
                <input
                  type="date"
                  value={booking.date}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={(event) => {
                    const nextDate = new Date(event.target.value);
                    if (Number.isNaN(nextDate.getTime())) return;
                    handleDateSelect(nextDate);
                  }}
                  className="w-full border-none bg-transparent text-base text-slate-900 outline-none"
                />
              </label>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Time slot
                </span>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => handleTimeSlot(slot.value)}
                      className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        booking.timeSlot === slot.value
                          ? "border-sky-500 bg-sky-500/10 text-sky-600"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-slate-600">
                  Meeting mode
                </span>
                <div className="flex gap-3">
                  {(["in-person", "online"] as MeetingMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleModeChange(mode)}
                      className={`flex-1 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                        booking.mode === mode
                          ? "border-sky-500 bg-sky-500/10 text-sky-600 shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                        {mode === "online" ? "Online" : "In-Person"}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">
                        {mode === "online"
                          ? "Secure virtual briefing"
                          : "Flagship penthouse lounge"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Meeting location
                </span>
                <input
                  type="text"
                  value={booking.location}
                  onChange={(event) =>
                    handleInputChange("location", event.target.value)
                  }
                  className="w-full border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder={
                    booking.mode === "online"
                      ? "Zoom — secure link shared post-confirmation"
                      : "Horizon Estates HQ, 5th Ave"
                  }
                  disabled={booking.mode === "online"}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm font-medium text-slate-600">
                Additional notes
              </span>
              <textarea
                value={booking.notes}
                onChange={(event) =>
                  handleInputChange("notes", event.target.value)
                }
                rows={4}
                placeholder="Share property goals, areas of interest, or preferred communication style."
                className="w-full resize-none border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-300"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Confirm Consultation
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </button>
            {confirmationMessage && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {confirmationMessage}
              </p>
            )}
          </form>

          <aside className="flex flex-col gap-6">
            <div className="glass-surface rounded-[28px] bg-white/90 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Availability
                </h2>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-[0.3em]">
                    {format(currentMonth, "MMM yyyy")}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors duration-300 hover:border-slate-300 hover:text-slate-700"
                >
                  ←
                </button>
                <div className="grid flex-1 grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {weekDayLabels.map((day) => (
                    <span key={day} className="py-2">
                      {day}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors duration-300 hover:border-slate-300 hover:text-slate-700"
                >
                  →
                </button>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-sm">
                {calendarDays.map((day) => {
                  const isDisabled = isBefore(day, today);
                  const active = isSameDay(day, selectedDate);
                  const availabilityState = availabilityLabel(day);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled || !isSameMonth(day, currentMonth)}
                      className={`relative flex h-16 flex-col items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 ${
                        active
                          ? "border-sky-500 bg-sky-500/10 text-sky-600 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800"
                      } ${isDisabled ? "cursor-not-allowed opacity-40" : ""} ${
                        !isSameMonth(day, currentMonth)
                          ? "border-dashed opacity-40"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                        {format(day, "dd")}
                      </span>
                      <span className="mt-1 text-[11px] text-slate-500">
                        {availabilityState}
                      </span>
                      {isToday(day) && (
                        <span className="absolute bottom-1 h-1 w-10 rounded-full bg-emerald-400/80" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-surface rounded-[28px] bg-slate-900/95 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Concierge preparation
                </h2>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                  Next Steps
                </span>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Portfolio specialist reviews your goals and prepares a tailored
                  briefing packet.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" />
                  Dedicated car service or digital meeting room reserved based
                  on your chosen experience.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Signed NDA and property dossiers delivered 24 hours prior to
                  your session.
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80">
                <p className="font-semibold text-white">
                  {summaryDetails.formattedDate}
                </p>
                <p className="mt-1 text-white/70">
                  {summaryDetails.formattedTime} —{" "}
                  {summaryDetails.isVirtual
                    ? "Virtual consultation"
                    : "Penthouse lounge briefing"}
                </p>
                <p className="mt-3 text-white/60">
                  Concierge: Natalie Arroyo · +1 (646) 901‑4420
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function addDaysSafe(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}
