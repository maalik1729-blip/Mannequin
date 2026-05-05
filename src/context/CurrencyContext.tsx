import { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "INR" | "EUR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (inrAmount: number) => string;
}

// Approximate conversion rates (base: INR)
const RATES: Record<Currency, number> = {
  INR: 1,
  EUR: 0.011,   // 1 INR ≈ 0.011 EUR
  USD: 0.012,   // 1 INR ≈ 0.012 USD
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  EUR: "€",
  USD: "$",
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "ak_currency";

const savedCurrency = (): Currency => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "INR" || v === "EUR" || v === "USD") return v;
  } catch {}
  return "INR";
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, _setCurrency] = useState<Currency>(savedCurrency);

  const setCurrency = (c: Currency) => {
    try { localStorage.setItem(STORAGE_KEY, c); } catch {}
    _setCurrency(c);
  };

  const format = (inrAmount: number): string => {
    const rate = RATES[currency];
    const symbol = SYMBOLS[currency];
    const converted = inrAmount * rate;

    if (currency === "INR") {
      return symbol + " " + converted.toLocaleString("en-IN");
    }
    return symbol + " " + converted.toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
