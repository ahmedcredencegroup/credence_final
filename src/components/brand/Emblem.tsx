import emblemUrl from "@/assets/credence-emblem.png";

export function Emblem({ className }: { className?: string }) {
  return <img src={emblemUrl} alt="Credence Group emblem" className={`object-contain ${className ?? ""}`} />;
}
