import Link from "next/link";

// The banner component at the top of the page.
export default function Banner() {
  return (
    <Link href="/">
      <div className="font-semibold text-5xl p-5 pb-7 text-center bg-zinc-900  text-yellow-300 -mb-2">
        FFXIV Savage Loot Tracker
      </div>
    </Link>
  );
}
