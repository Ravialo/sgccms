import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function HomePage() {
  return (
    <div className="flex md:flex-row flex-col items-center min-h-screen px-5 py-10 md:p-10 bg-slate-900 text-white">
      <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font md:text-5xl sm:text-4xl text-3xl mb-4 font-medium text-white">
          School Guidance <br className="hidden lg:inline-block" />
          Complaint and Counselling <br className="hidden lg:inline-block" />
          Management System
        </h1>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          This system manages student complaints & counseling appointments in one place.
        </p>
        <div className="flex justify-center">
          <Link className={cn(buttonVariants({ size: "lg", variant: "secondary" }))} href="/sign-in">
            Sign-In
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Image
          className="object-cover object-center rounded-lg"
          alt="hero"
          src="/hero-bg.jpg"
          width={600}
          height={600}
          priority
        />
      </div>
    </div>
  );
}

export default HomePage;
