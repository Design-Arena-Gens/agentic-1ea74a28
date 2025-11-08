export type MeetingMode = "online" | "in-person";

export interface TimeSlot {
  label: string;
  value: string;
}

export interface BookingDetails {
  clientName: string;
  email: string;
  date: string;
  timeSlot: string;
  mode: MeetingMode;
  location: string;
  notes?: string;
  virtualMeetingLink?: string;
}
