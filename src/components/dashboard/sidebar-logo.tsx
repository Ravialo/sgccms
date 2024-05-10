"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "/public/logo.png";

function SidebarLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-4">
      <Image src={Logo} loading="lazy" width={50} height={50} alt="logo" />
      <h1 className="text-3xl font-bold text-muted-foreground">SGCCMS</h1>
    </Link>
  );
}
export default SidebarLogo;
