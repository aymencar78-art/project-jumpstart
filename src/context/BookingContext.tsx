import { createContext, useContext, useState, ReactNode } from "react";

export type BookingDraft = {
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
};

type Ctx = {
  draft: BookingDraft;
  setDraft: (d: Partial<BookingDraft>) => void;
  resetDraft: () => void;
};

const empty: BookingDraft = { departure: "", destination: "", departureDate: "", departureTime: "" };

const BookingContext = createContext<Ctx | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraftState] = useState<BookingDraft>(empty);
  const setDraft = (d: Partial<BookingDraft>) => setDraftState((p) => ({ ...p, ...d }));
  const resetDraft = () => setDraftState(empty);
  return (
    <BookingContext.Provider value={{ draft, setDraft, resetDraft }}>{children}</BookingContext.Provider>
  );
};

export const useBookingDraft = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingDraft must be used inside <BookingProvider>");
  return ctx;
};
