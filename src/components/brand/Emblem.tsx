import emblemUrl from "@/assets/credence-emblem.svg";

export function Emblem({ className }: { className?: string }) {
  return <img src={emblemUrl} alt="Credence Groups emblem" className={className} />;
}
