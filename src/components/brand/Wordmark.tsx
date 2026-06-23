import wordmarkUrl from "@/assets/credence-wordmark.png";

export function Wordmark({ className }: { className?: string }) {
  return <img src={wordmarkUrl} alt="Credence Group" className={`object-contain ${className ?? ""}`} />;
}
