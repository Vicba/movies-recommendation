import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-[2064px] flex-col items-center justify-between p-24 border border-white">
      <Link href="/dashboard">
        <p className="text-2xl font-bold">Dashboard</p>
      </Link>
    </main>
  );
}
