"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/employhero.svg";
import { Button } from "./ui/button";

export function ModuleButton({ href, title }) {
  return (
    <Button asChild>
      <Link href={`${href}`}>{title}</Link>
    </Button>
  );
}

const NavBar = () => {
  return (
    <header className="fixed justify-between w-full shadow-lg bg-slate-100/95">
      <nav className="justify-between flex w-full p-4 items-center">
        <Image src={Logo} height={30} width={30} alt="logo" />
        <ModuleButton href="#apply" title="Apply" />
      </nav>
    </header>
  );
};

export default NavBar;
