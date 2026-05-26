import { useMemo } from "react";

export type RsvpType = "simple" | "detailed";
export type ScreenState = "not_responded" | "accepted" | "submitted";
export type FieldType = "short text" | "long text" | "number" | "time" | "date" | "select" | "multi-select" | "phone" | "email" | "yes/no";

export interface RsvpField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface RsvpConfig {
  rsvpType: RsvpType;
  allowEditRsvp: boolean;
  form: {
    fields: RsvpField[];
  };
}

export interface RsvpState {
  config: RsvpConfig;
  initialScreen: ScreenState | null;
}

const DEFAULT_CONFIG: RsvpConfig = {
  rsvpType: "detailed",
  allowEditRsvp: true,
  form: {
    fields: [
      { id: "guestCount", type: "number", label: "Number of Guests", placeholder: "e.g. 2", required: true },
      { id: "arrivalTime", type: "time", label: "Expected Arrival Time", required: false },
      { id: "mealPreference", type: "select", label: "Meal Preference", options: ["Veg", "Jain", "Non-Veg"], required: false }
    ]
  }
};

export function useRsvpConfig(): RsvpState {
  return useMemo(() => {
    // Determine preview values from URL
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : "");
    
    // Deep clone default config
    const config: RsvpConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

    const rsvpParam = searchParams.get("rsvp");
    if (rsvpParam === "simple" || rsvpParam === "detailed") {
      config.rsvpType = rsvpParam as RsvpType;
    }

    const editParam = searchParams.get("edit");
    if (editParam === "on") config.allowEditRsvp = true;
    if (editParam === "off") config.allowEditRsvp = false;

    const screenParam = searchParams.get("screen");
    let initialScreen: ScreenState | null = null;
    if (screenParam === "accepted" || screenParam === "submitted") {
      initialScreen = screenParam as ScreenState;
    }

    return { config, initialScreen };
  }, []);
}
