import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-pitch text-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none">This page isn&apos;t set up yet.</h1>
        <p className="mt-6 text-lg text-smoke">The link may be old. Head back home to see our setups.</p>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-gold px-7 py-4 text-sm font-semibold text-pitch hover:bg-gold-soft">
          Go to home
        </Link>
      </div>
    </section>
  );
}
