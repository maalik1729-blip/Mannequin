// Modest cloth cover (chest + pelvis) overlaid on female full-body mannequin images.
export const FEMALE_COVER_IDS = new Set([
  "black-female-trio",
  "gold-female-duo",
  "gold-white-female",
]);

const STYLE = {
  background: "linear-gradient(180deg,#e8d9b7,#bfa775)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)",
};

export const FemaleCover = ({ id, scaleOnHover = false }: { id: string; scaleOnHover?: boolean }) => {
  if (!FEMALE_COVER_IDS.has(id)) return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${scaleOnHover ? "transition-smooth group-hover:scale-105" : ""}`}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-md"
        style={{ top: "36%", width: "38%", height: "7%", ...STYLE }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-md"
        style={{ top: "55%", width: "32%", height: "8%", ...STYLE }}
      />
    </div>
  );
};

export default FemaleCover;
