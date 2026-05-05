import { useCurrency, Currency } from "@/context/CurrencyContext";

const OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: "INR", label: "INR", symbol: "₹" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "USD", label: "USD", symbol: "$" },
];

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      id="currency-toggle"
      role="group"
      aria-label="Select currency"
      className="inline-flex items-center border border-border rounded-full overflow-hidden"
      style={{ height: "32px" }}
    >
      {OPTIONS.map((opt) => {
        const active = currency === opt.value;
        return (
          <button
            key={opt.value}
            id={`currency-${opt.value.toLowerCase()}`}
            onClick={() => setCurrency(opt.value)}
            aria-pressed={active}
            title={opt.label}
            className={`px-3 h-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 flex items-center gap-1 border-r border-border last:border-r-0 ${
              active
                ? "bg-gold text-obsidian"
                : "bg-background text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            <span className="text-[11px]">{opt.symbol}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
