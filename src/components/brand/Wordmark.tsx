import wordmarkUrl from "@/assets/credence-wordmark.svg";

export function Wordmark({ className }: { className?: string }) {
  return <img src={wordmarkUrl} alt="Credence Groups" className={className} />;
}
