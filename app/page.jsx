"use client";
import Image from "next/image";
import { MoveRightIcon } from "lucide-react";

import OfficeImage from "../public/office-meeting.jpg";

import { ApplicationForm } from "./components/ApplicationForm";
import TypeWriterEffect from "./components/TypeWriterEffect";
import { ModuleButton } from "./components/NavBar";

export default function Home() {
  const typewriterEffects = ["We are Hiring", "Apply Now", "Join Us Today"];
  return (
    <main className="block pt-24 mx-4 lg:max-w-4xl lg:m-auto space-y-6 !mb-10">
      <div>
        <h1 className="text-3xl mb-2 sm:text-6xl md:text-7xl">
          <span className="text-green-800">Hello</span> There
          <span className="text-green-800">&nbsp;! 👋</span>
          <TypeWriterEffect strings={typewriterEffects} />
        </h1>
        <p>Apply for suitable jobs</p>
        <p className="mt-2">
          <ModuleButton
            href="#apply"
            title={
              <>
                <span>Get Started&nbsp;</span>
                <MoveRightIcon />
              </>
            }
          />
        </p>
      </div>
      <div>
        <Image
          src={OfficeImage}
          alt="hire"
          placeholder="blur"
          width={1200}
          height={800}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl md:text-5xl sm:text-3xl text-black font-bold">
          Employment Application
        </h2>
        <p className="text-base">
          Fill the form below accurately indicating your potentials and
          sustainability to job applying for.
        </p>
        <ApplicationForm />
      </div>
    </main>
  );
}
