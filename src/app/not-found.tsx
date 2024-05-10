import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Page Not Found</h1>
        <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          The page you&lsquo;re looking for couldn&lsquo;t be found.
        </p>
      </div>
      <Link href="/">
        <Button variant="outline" className="px-10">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
