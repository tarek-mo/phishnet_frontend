import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="container mx-auto sticky top-0 z-40 w-full border-b bg-background">
      <div className=" flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          PhishNet
        </Link>

        <nav className="flex gap-4 items-center">
          <Link href="#predict">Predict</Link>
          <Link href="#history">History</Link>
        </nav>
      </div>
    </header>
  );
}
