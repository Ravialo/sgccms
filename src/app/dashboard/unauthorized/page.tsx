"use client";

import { ArrowLeftIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

function UnauthorizedPage({ searchParams }: { searchParams: { redirect: string } }) {
  const redirect = searchParams.redirect;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center p-6">
        <div className="text-center">
          <LockIcon className="w-16 h-16 mx-auto" />
          <h2 className="text-lg font-medium mt-4">Access Denied</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            You do not have permission to access this page.
          </p>
          <div className="mt-6">
            <Link href={redirect || "/dashboard"}>
              <Button>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
export default UnauthorizedPage;
