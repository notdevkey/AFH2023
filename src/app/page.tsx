import Link from "next/link";

export default function Home() {
  return (
    <Link className="font-bold" href="/dashboard">
      Go to dashboard
    </Link>
  );
}
