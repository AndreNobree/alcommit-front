import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-150 text-green-500">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <Link href="/" className="mb-6 mt-20">
        <p className="text-green-500">[ REDIRECT TO HOME ]</p>
      </Link>
    </div>
  );
}